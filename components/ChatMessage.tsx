
import React from 'react';
import type { ChatMessage as ChatMessageType } from '../types';
import { UserIcon, BotIcon } from './Icons';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 animate-fade-in-up ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
          <BotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`max-w-xl w-full px-1 ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block rounded-2xl p-4 text-left ${
            isUser
              ? 'bg-sky-500 text-white rounded-br-none'
              : 'bg-white text-slate-700 rounded-bl-none shadow-md'
          }`}
        >
          {message.content}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
