import React from 'react';
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';

interface Review {
  name: string;
  initials: string;
  rating: number;
  timeAgo: string;
  comment: string;
}

interface ReviewsSectionProps {
  rating: number;
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ rating, reviews }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                    {review.initials}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex text-[#b4690e]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={12} fill={star <= review.rating ? "currentColor" : "none"} className={star <= review.rating ? "" : "text-gray-300"} />
                            ))}
                        </div>
                        <span>{review.timeAgo}</span>
                    </div>
                </div>
                <button className="ml-auto text-gray-500 hover:text-gray-900">
                    <MoreHorizontal size={20} />
                </button>
            </div>
            
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {review.comment}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Helpful?</span>
                <button className="hover:text-gray-900 flex items-center gap-1">
                    <ThumbsUp size={14} />
                </button>
                <button className="hover:text-gray-900 flex items-center gap-1">
                    <ThumbsDown size={14} />
                </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 border border-gray-900 text-gray-900 font-bold py-2 px-4 text-sm hover:bg-gray-50 transition-colors">
        See more reviews
      </button>
    </div>
  );
};

export default ReviewsSection;
