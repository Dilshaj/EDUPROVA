import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LectureDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    video?: string;

    @IsString()
    @IsOptional()
    coverImage?: string;

    @IsBoolean()
    @IsOptional()
    freePreview?: boolean;
}

class CurriculumSectionDto {
    @IsString()
    title: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LectureDto)
    lectures: LectureDto[];
}

export class CreateCourseDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    subtitle?: string;

    @IsString()
    category: string;

    @IsString()
    level: string;

    @IsString()
    language: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsNumber()
    originalPrice: number;

    @IsNumber()
    @IsOptional()
    discountedPrice?: number;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsString()
    @IsOptional()
    video?: string;

    @IsString()
    @IsOptional()
    bundleDiscount?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CurriculumSectionDto)
    curriculum: CurriculumSectionDto[];

    @IsArray()
    @IsString({ each: true })
    learningPoints: string[];

    @IsArray()
    @IsString({ each: true })
    requirements: string[];

    @IsArray()
    @IsString({ each: true })
    courseIncludes: string[];

    @IsArray()
    @IsOptional()
    bundleCourses?: string[];

    @IsBoolean()
    @IsOptional()
    isBundleEnabled?: boolean;
}
