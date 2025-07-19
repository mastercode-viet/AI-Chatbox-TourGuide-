
import React from 'react';
import type { Tour } from '../types';
import { StarIcon, CalendarIcon, PriceIcon, CheckCircleIcon } from './Icons';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-3">{tour.name}</h3>
      
      <div className="space-y-3 mb-4 text-slate-600 text-sm">
        <div className="flex items-start">
          <StarIcon className="w-5 h-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-700">Điểm nổi bật</p>
            <p>{tour.highlights}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-3 text-sky-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-700">Thời lượng</p>
            <p>{tour.duration}</p>
          </div>
        </div>
        <div className="flex items-center">
          <PriceIcon className="w-5 h-5 mr-3 text-emerald-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-700">Khoảng giá</p>
            <p>{tour.price}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-sky-50 rounded-lg p-3">
        <div className="flex items-start">
          <CheckCircleIcon className="w-5 h-5 mr-3 mt-0.5 text-sky-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sky-800">Lý do phù hợp</p>
            <p className="text-sm text-sky-700">{tour.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
