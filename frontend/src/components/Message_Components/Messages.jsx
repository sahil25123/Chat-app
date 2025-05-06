import React, { useEffect, useRef, useState } from 'react'
import SingleMsg from './SingleMsg'
import useGetMessages from '../../hooks/useGetMessage.js';
import MessageSkelaton from "../skeleton/MessageSkeleton.jsx"
import useConversation from '../../zustand/useConversation';
import useListenMessages from '../../hooks/useListenMessages.js';

function Messages() {
  const { messages, loading, error } = useGetMessages();
  useListenMessages();
  const { selectedConversation } = useConversation();
  const messagesEndRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const safeMessages = Array.isArray(messages) ? messages : [];

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsScrolled(scrollTop < scrollHeight - clientHeight - 100);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      
      // Small delay to ensure DOM is updated
      const timer = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div 
      className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400'
      onScroll={handleScroll}
    >
      <div className='px-6 py-4 space-y-4'>
        {loading && [...Array(3)].map((_, idx) => (
          <MessageSkelaton key={`skeleton-${idx}`} />
        ))}

        {!loading && error && (
          <div className="text-center text-red-500 p-4">
            <p>Failed to load messages</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-primary hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && safeMessages.length > 0 && safeMessages.map((message, index) => (
          <SingleMsg 
            key={`${message._id}-${message.createdAt}-${index}`} 
            message={message} 
          />
        ))}
        
        {!loading && !error && (!messages || messages.length === 0) && (
          <div className="text-center p-4">
            <p className="text-pink-400">Send a Message to Start the conversation</p>
            <p className="text-sm text-gray-500 mt-2">Your messages will appear here</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default Messages
