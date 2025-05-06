import React, { useEffect, useRef } from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from "react-icons/ti"
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'


function MessageContainer() {
  const { selectedConversation } = useConversation();
  const noChatSelected = !selectedConversation;
  const messagesEndRef = useRef(null);


  const {onlineUsers} = useSocketContext();
  const isOnline = selectedConversation && onlineUsers.includes(selectedConversation._id);

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
              <div className="avatar" style={{position: 'relative'}}>
                <div className="w-12 rounded-full ring ring-white ring-offset-2">
                  <img 
                    src={selectedConversation.ProfilePic || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"} 
                    alt="user avatar" 
                    onError={(e) => {
                      e.target.src = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
                    }}
                  />
                  <span
                    style={{position: 'absolute', top: 2, right: 2, width: 12, height: 12, borderRadius: '50%', border: '2px solid white', backgroundColor: isOnline ? '#22c55e' : '#a3a3a3', display: 'block'}}
                    title={isOnline ? "Online" : "Offline"}
                  ></span>
                </div>
              </div>
              <div className='flex flex-col'>
                <span className='text-white font-bold text-lg'>{selectedConversation.fullName}</span>
                <span className='text-white/80 text-sm'>{isOnline ? 'Online' : 'Offline'}</span>
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
  