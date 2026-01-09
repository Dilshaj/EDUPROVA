import { Controller, Post, Body, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ReqUser } from '../auth/decorators/user.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    @Roles('ADMIN', 'SUPER_ADMIN', 'TEACHER')
    async create(@Body() createCourseDto: CreateCourseDto, @ReqUser() user: any) {
        return this.coursesService.create(createCourseDto, user.userId, user.role);
    }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @Patch(':id/status')
    @Roles('ADMIN', 'SUPER_ADMIN')
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.coursesService.updateStatus(id, status);
    }
}
