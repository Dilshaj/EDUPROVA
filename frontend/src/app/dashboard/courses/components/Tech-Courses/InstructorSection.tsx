import React from 'react';
import { Star, Award, Users, PlayCircle } from 'lucide-react';
import Image from 'next/image';

interface InstructorProps {
  name: string;
  role: string;
  image: string;
  rating: number;
  reviews: string;
  students: string;
  courses: number;
  bio: string;
}

const InstructorSection: React.FC<InstructorProps> = ({
  name,
  role,
  image,
  rating,
  reviews,
  students,
  courses,
  bio
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-blue-600 underline mb-1 cursor-pointer">{name}</h3>
        <p className="text-gray-600 mb-4">{role}</p>
        
        <div className="flex gap-4 mb-4">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gray-200">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="space-y-1 text-sm text-gray-700 mt-2">
                <div className="flex items-center gap-2">
                    <Star size={16} fill="currentColor" className="text-gray-900" />
                    <span>{rating} Instructor Rating</span>
                </div>
                <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-900" />
                    <span>{reviews} Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-900" />
                    <span>{students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                    <PlayCircle size={16} className="text-gray-900" />
                    <span>{courses} Courses</span>
                </div>
            </div>
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {bio}
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
