// File: src/app/components/Tech-Courses/SidebarPurchaseBox.tsx
import React, { useState } from 'react';
import {
  PlayCircle,
  Award,
  Globe,
  Infinity,
  Smartphone,
  Folder,
  Download,
  Monitor,
  AlarmClock,
  Heart,
  Share2
} from 'lucide-react';
import Image from 'next/image';

interface SidebarPurchaseBoxProps {
  price: string;
  originalPrice: string;
  discount: string;
  daysLeft: number;
}

const SidebarPurchaseBox: React.FC<SidebarPurchaseBoxProps> = ({
  price,
  originalPrice,
  discount,
  daysLeft
}) => {
  // Track whether the user liked / wishlisted the course
  const [liked, setLiked] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use isIntersecting with a negative top margin corresponding to the sticky offset.
        // When the sentinel scrolls up past the "safe zone" (top 16px + buffer),
        // it is no longer intersecting, meaning the sticky element has "stuck".
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [1],
        rootMargin: '-17px 0px 0px 0px', // Matches top-4 (16px) + 1px buffer
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Video Preview - Scrolls away */}
      <div className={`w-full lg:max-w-[340px] relative aspect-video bg-gray-900 cursor-pointer group overflow-hidden border border-gray-200 rounded-t-lg transition-all duration-300 ${isSticky ? 'rounded-b-lg' : 'rounded-b-none'}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform group-hover:scale-110">
          <PlayCircle className="w-12 h-12 text-white rounded-full p-2" />
        </div>

        {/* Placeholder Image */}
        <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity">
          <Image src="/courses/python.png" alt="Preview" fill className="object-cover" />
        </div>
      </div>

      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} className="w-full h-px -mb-px invisible" />

      {/* Content - Sticky */}
      <div className={`w-full lg:max-w-[340px] bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] lg:sticky top-4 z-10 transition-all duration-300 border border-gray-200 rounded-b-lg ${isSticky ? 'rounded-t-lg border-t' : 'rounded-t-none border-t-0'} mb-8 lg:mb-0`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-500 line-through text-lg">{originalPrice}</span>
            <span className="text-gray-900 text-lg">{discount} off</span>
          </div>

          <div className="flex items-center gap-2 text-[#b32d0f] text-sm font-normal mb-4">
            <AlarmClock className="w-4 h-4" color="#b32d0f" />
            <span>{daysLeft} days left at this price!</span>
          </div>

          {/* Cart + Heart row */}
          <div className="flex items-center gap-3 mb-4">
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 rounded-lg transition"
              type="button"
              aria-label="Add to cart"
            >
              Go to cart
            </button>

            <button
              onClick={() => setLiked(!liked)}
              type="button"
              aria-pressed={liked}
              aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-blue-500 bg-white transition-all"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${liked ? 'text-blue-600' : 'text-blue-500'
                  }`}
                fill={liked ? '#2563eb' : 'none'}   // ← Fills the inside
              />
            </button>


          </div>

          <button className="w-full bg-white border border-blue-600 text-blue-500 font-bold h-12 mb-4 hover:bg-gray-50 transition-colors text-base rounded" type="button">
            Buy now
          </button>

          <div className="text-center text-xs text-gray-600 mb-6">
            30-Day Money-Back Guarantee
          </div>

          <div className="space-y-3 mb-6">
            <h4 className="font-bold text-gray-900 text-sm">This course includes:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Monitor size={16} className="shrink-0" /> <span>65.5 hours on-demand video</span>
              </li>
              <li className="flex items-center gap-3">
                <Folder size={16} className="shrink-0" /> <span>12 articles</span>
              </li>
              <li className="flex items-center gap-3">
                <Download size={16} className="shrink-0" /> <span>102 downloadable resources</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone size={16} className="shrink-0" /> <span>Access on mobile and TV</span>
              </li>
              <li className="flex items-center gap-3">
                <Infinity size={16} className="shrink-0" /> <span>Full lifetime access</span>
              </li>
              <li className="flex items-center gap-3">
                <Award size={16} className="shrink-0" /> <span>Certificate of completion</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-black pt-4 flex justify-center">
            <button
              type="button"
              className="flex items-center gap-2 text-base font-semibold text-black hover:text-black transition"
            >
              <Share2 className="w-5 h-5 text-black" />
              <span>Share</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SidebarPurchaseBox;
