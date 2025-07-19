
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { createChatSession } from './services/geminiService';
import type { ChatMessage as ChatMessageType, Tour } from './types';
import ChatMessage from './components/ChatMessage';
import TourCard from './components/TourCard';
import LoadingSpinner from './components/LoadingSpinner';
import InputBar from './components/InputBar';

const App: React.FC = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const session = createChatSession();
      setChatSession(session);

      const initialMessage: ChatMessageType = {
        id: 'initial-0',
        role: 'model',
        content: (
          <p>
            Xin chào! Tôi là TourGuide AI, chuyên gia tư vấn du lịch ảo của bạn.
            <br />
            Bạn muốn đi du lịch ở đâu, hay có sở thích đặc biệt nào không?
          </p>
        ),
      };
      setChatHistory([initialMessage]);
    } catch (error) {
       console.error("Failed to initialize chat session:", error);
       const errorMessage: ChatMessageType = {
        id: 'error-0',
        role: 'model',
        content: "Rất tiếc, đã có lỗi xảy ra khi kết nối với TourGuide AI. Vui lòng kiểm tra lại cấu hình API Key và làm mới trang."
       };
       setChatHistory([errorMessage]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatHistory]);

  const parseAndRenderResponse = (text: string): React.ReactNode => {
    const jsonRegex = /```json\n([\s\S]*?)\n```/;
    const match = text.match(jsonRegex);

    if (match && match[1]) {
      try {
        const tours: Tour[] = JSON.parse(match[1]);
        const textParts = text.split(match[0]);

        return (
          <>
            {textParts[0] && <p className="mb-4">{textParts[0].trim()}</p>}
            <div className="grid md:grid-cols-2 gap-4">
              {tours.map((tour, index) => (
                <TourCard key={index} tour={tour} />
              ))}
            </div>
            {textParts[1] && <p className="mt-4">{textParts[1].trim()}</p>}
          </>
        );
      } catch (error) {
        console.error("Failed to parse JSON from AI response:", error);
        return <p>{text}</p>; // Fallback to raw text if JSON is invalid
      }
    }
    return <p>{text}</p>;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatSession) return;

    setIsLoading(true);
    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
    };
    setChatHistory((prev) => [...prev, userMessage]);
    const messageToSend = userInput;
    setUserInput('');

    try {
      const result = await chatSession.sendMessage({ message: messageToSend });
      const responseText = result.text;
      const aiContent = parseAndRenderResponse(responseText);

      const aiMessage: ChatMessageType = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: aiContent,
      };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans">
       <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
          }
       `}</style>
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center text-slate-800">TourGuide AI ✈️</h1>
        <p className="text-center text-sm text-slate-500">Người bạn đồng hành lý tưởng</p>
      </header>
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && chatHistory.length > 0 && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mr-4"></div>
             <div className="bg-white text-slate-700 rounded-2xl rounded-bl-none p-4 shadow-md">
                <LoadingSpinner />
             </div>
          </div>
        )}
      </main>
      <footer className="bg-white/80 backdrop-blur-sm p-2 border-t border-slate-200">
        <InputBar 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
};

export default App;
