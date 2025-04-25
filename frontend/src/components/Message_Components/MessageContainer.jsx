import React from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { TiMessages } from "react-icons/ti"

function MessageContainer() {
  const noChatSelected = true; // Changed to lowercase to follow React conventions
  
  if (noChatSelected) {
    return (
      <div className='flex flex-col flex-1 bg-gray-800'>
        <div className='flex items-center justify-center w-full h-full'>
          <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
            <p>Welcome to ChatterBox</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-1 bg-gray-800'>
      {/* Chat Header */}
      <div className='bg-slate-700 px-4 py-2 mb-2 flex items-center gap-2'>
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="user avatar" />
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-gray-200 font-bold'>John Doe</span>
          <span className='text-xs text-gray-400'>Online</span>
        </div>
      </div>

      {/* Messages */}
      <Messages />
      
      {/* Message Input */}
      <MessageInput />
    </div>
  );
}

export default MessageContainer
  