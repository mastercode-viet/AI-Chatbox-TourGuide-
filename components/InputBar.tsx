
import React from 'react';
import { SendIcon } from './Icons';

interface InputBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3 p-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={isLoading ? "TourGuide AI đang suy nghĩ..." : "Nhập điểm đến hoặc sở thích của bạn..."}
        disabled={isLoading}
        className="flex-grow p-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300 shadow-sm disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading || !value}
        className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-110 active:scale-100"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default InputBar;
