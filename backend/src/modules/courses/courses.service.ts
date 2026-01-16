import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../../database/schemas/course.schema.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { REDIS_CLIENT } from '../../infrastructure/redis/redis.module.js';
import { Redis } from 'ioredis';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) { }

    async create(createCourseDto: CreateCourseDto, instructorId: string, userRole: string): Promise<Course> {
        const initialStatus = (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') ? 'PUBLISHED' : 'UNDER_REVIEW';

        const createdCourse = new this.courseModel({
            ...createCourseDto,
            instructor: instructorId,
            status: initialStatus,
        });
        return createdCourse.save();
    }

    async findAll(query: any = {}): Promise<Course[]> {
        const cacheKey = `courses:${JSON.stringify(query)}`;
        let cachedData: string | null = null;

        try {
            if (this.redis.status === 'ready') {
                cachedData = await this.redis.get(cacheKey);
            }
        } catch (err) {
            // console.error('Redis get error:', err);
        }

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const filter: any = {};

        if (query.search) {
            filter.$or = [
                { title: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } }
            ];
        }

        if (query.category) {
            // Broad matching for category based on title or description or implicit category field if exists
            // Combining with search filter if both exist might need $and, but usually user does one or other or we can just merge
            const catRegex = { $regex: query.category, $options: 'i' };
            if (filter.$or) {
                filter.$and = [
                    { $or: filter.$or },
                    { $or: [{ title: catRegex }, { category: catRegex }] } // Assuming category field might exist, else just title
                ];
                delete filter.$or;
            } else {
                filter.$or = [{ title: catRegex }, { category: catRegex }];
            }
        }

        let sortOption: any = { createdAt: -1 }; // Default new
        if (query.sort === 'trending') {
            sortOption = { rating: -1, numReviews: -1 };
        }

        const courses = await this.courseModel.find(filter)
            .populate('instructor', 'firstName lastName')
            .sort(sortOption)
            .limit(parseInt(query.limit) || 100)
            .exec();

        try {
            if (this.redis.status === 'ready') {
                await this.redis.set(cacheKey, JSON.stringify(courses), 'EX', 60); // Cache for 60s
            }
        } catch (err) {
            // console.error('Redis set error:', err);
        }

        return courses;
    }

    async findOne(id: string): Promise<Course | null> {
        return this.courseModel.findById(id).populate('instructor', 'firstName lastName').exec();
    }

    async updateStatus(id: string, status: string): Promise<Course | null> {
        return this.courseModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
}
