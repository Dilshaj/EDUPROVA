import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../../database/schemas/course.schema.js';
import { CreateCourseDto } from './dto/create-course.dto.js';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>
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

    async findAll(): Promise<Course[]> {
        return this.courseModel.find().populate('instructor', 'firstName lastName').exec();
    }

    async findOne(id: string): Promise<Course | null> {
        return this.courseModel.findById(id).populate('instructor', 'firstName lastName').exec();
    }

    async updateStatus(id: string, status: string): Promise<Course | null> {
        return this.courseModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
}
