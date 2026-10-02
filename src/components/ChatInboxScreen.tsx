import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';

export const ChatInboxScreen: React.FC = () => {
  const { chatMessages, sendChatMessage, showToast, userMode } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim()) {
      sendChatMessage(inputText);
      setInputText('');
    }
  };

  const quickReplies = [
    "I'm at home, elevator is working.",
    "Please call before ringing bell.",
    "Do you have a test lamp with you?",
    "Need urgent assistance with main breaker.",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto w-full px-margin pb-20">
      {/* Chat Partner Header */}
      <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <img
              src={userMode === 'client' ? ASSETS.rajAvatar : ASSETS.userAvatar}
              alt="Chat Partner"
              className="w-11 h-11 rounded-full object-cover shadow-inner"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary ring-2 ring-white"></span>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-on-surface truncate">
              {userMode === 'client' ? 'Rajesh Kumar (Electrician)' : 'Ananya Sharma (Customer)'}
            </h2>
            <p className="text-xs text-secondary font-semibold">Active now • Arriving in 14 mins</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => showToast('Calling technician via masked privacy line...')}
            className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-secondary-container/40 flex items-center justify-center text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        <div className="text-center my-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-outline px-2.5 py-1 rounded-full bg-surface-container-high">
            Security & Escrow Chat Guard Active
          </span>
        </div>

        {chatMessages.map((msg) => {
          const isMe =
            (userMode === 'client' && msg.sender === 'user') ||
            (userMode === 'partner' && msg.sender === 'partner');

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                  isMe
                    ? 'bg-primary text-on-primary rounded-br-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-surface-container-high rounded-bl-xs'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    isMe ? 'text-on-primary/70' : 'text-outline'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 -mx-margin px-margin">
        {quickReplies.map((reply, idx) => (
          <button
            key={idx}
            onClick={() => {
              sendChatMessage(reply);
            }}
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
            type="button"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="relative flex items-center gap-2 mt-1">
        <button
          type="button"
          onClick={() => showToast('Photo attachment simulated')}
          className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            userMode === 'client'
              ? 'Message Rajesh about fan issue...'
              : 'Reply to Ananya Sharma...'
          }
          className="flex-1 h-11 px-3.5 rounded-xl bg-surface-container-lowest text-xs text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow hover:bg-primary-container transition-all disabled:opacity-40 active:scale-95 flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  );
};
