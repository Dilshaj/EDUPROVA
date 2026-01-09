import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
class Lecture {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop()
    video?: string;

    @Prop()
    coverImage?: string;

    @Prop({ default: false })
    freePreview: boolean;
}

const LectureSchema = SchemaFactory.createForClass(Lecture);

@Schema()
class CurriculumSection {
    @Prop({ required: true })
    title: string;

    @Prop({ type: [LectureSchema], default: [] })
    lectures: Lecture[];
}

const CurriculumSectionSchema = SchemaFactory.createForClass(CurriculumSection);

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Course {
    @Prop({ required: true })
    title: string;

    @Prop()
    subtitle: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    level: string;

    @Prop({ required: true })
    language: string;

    @Prop({ required: true })
    description: string;

    @Prop({ default: 'USD' })
    currency: string;

    @Prop({ required: true })
    originalPrice: number;

    @Prop()
    discountedPrice?: number;

    @Prop()
    thumbnail?: string;

    @Prop()
    video?: string;

    @Prop()
    bundleDiscount?: string;

    @Prop({ type: [CurriculumSectionSchema], default: [] })
    curriculum: CurriculumSection[];

    @Prop([String])
    learningPoints: string[];

    @Prop([String])
    requirements: string[];

    @Prop([String])
    courseIncludes: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Course' }] })
    bundleCourses: MongooseSchema.Types.ObjectId[];

    @Prop({ default: false })
    isBundleEnabled: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    instructor: MongooseSchema.Types.ObjectId;

    @Prop({ default: 'DRAFT', enum: ['DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'REJECTED'] })
    status: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
