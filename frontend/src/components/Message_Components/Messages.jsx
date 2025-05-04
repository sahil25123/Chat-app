import React, { useEffect, useRef, useState } from 'react'
import SingleMsg from './SingleMsg'
import useGetMessages from '../../hooks/useGetMessage.js';
import MessageSkelaton from "../skeleton/MessageSkeleton.jsx"
import useConversation from '../../zustand/useConversation';

function Messages() {
  const { messages, loading, error } = useGetMessages();
  const { selectedConversation } = useConversation();
  const messagesEndRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Debug logging
  useEffect(() => {
    // console.log("Messages Debug:", {
    //   selectedConversation: selectedConversation?._id,
    //   messagesCount: messages?.length,
    //   loading,
    //   error,
    //   messages: messages
    // });
  }, [messages, loading, error, selectedConversation]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setIsScrolled(true);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    setIsScrolled(isAtBottom);
  };

  useEffect(() => {
    if (isScrolled) {
      scrollToBottom();
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

        {!loading && !error && messages?.length > 0 && messages.map((message, index) => (
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
