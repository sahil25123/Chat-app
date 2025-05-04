import React, { useEffect, useRef } from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from "react-icons/ti"
import useConversation from '../../zustand/useConversation'

function MessageContainer() {
  const { selectedConversation } = useConversation();
  const noChatSelected = !selectedConversation;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  if (noChatSelected) {
    return (
      <div className='flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
        <div className='flex items-center justify-center h-full'>
          <div className='card w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border border-white/30'>
            <div className='card-body p-8'>
              <div className='flex flex-col items-center gap-4'>
                <h2 className='text-2xl font-bold text-gray-800'>Welcome to ChatterBox</h2>
                <p className='text-gray-600 text-center'>Select a chat to start messaging</p>
                <TiMessages className="text-5xl text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      <div className='card w-full h-full bg-white/80 backdrop-blur-sm shadow-xl border border-white/30'>
        <div className='card-body p-0 flex flex-col h-full'>
          {/* Chat Header */}
          <div className='bg-gradient-to-r from-primary to-secondary px-6 py-4 rounded-t-2xl'>
            <div className='flex items-center gap-4'>
              <div className="avatar online">
                <div className="w-12 rounded-full ring ring-white ring-offset-2">
                  <img 
                    src={selectedConversation.ProfilePic || "https://via.placeholder.com/48"} 
                    alt="user avatar" 
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/48";
                    }}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-white font-bold text-lg'>{selectedConversation.fullName}</span>
                <span className='text-white/80 text-sm'>Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className='flex-1 min-h-0 overflow-hidden'>
            <Messages />
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className='p-4 border-t border-gray-200'>
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageContainer
  