import React, { useEffect, useRef } from 'react'
import SingleMsg from './SingleMsg'
import useGetMessages from '../../hooks/useGetMessage.js';
import MessageSkelaton from "../skeleton/MessageSkeleton.jsx"

function Messages() {
  const { messages, loading } = useGetMessages();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400'>
      <div className='px-6 py-4 space-y-4'>
        {!loading && messages?.length > 0 && messages.map((message, index) => (
          <SingleMsg 
            key={`${message._id}-${message.createdAt}-${index}`} 
            message={message} 
          />
        ))}
        
        {loading && [...Array(3)].map((_, idx) => (
          <MessageSkelaton key={`skeleton-${idx}`} />
        ))}

        {!loading && (!messages || messages.length === 0) && (
          <p className="text-center text-pink-400">Send a Message to Start the conversation</p>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default Messages
