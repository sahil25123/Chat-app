import React from 'react'
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

function Conversation({ conversation }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
 
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-gray-200' : ''
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline? "online" :""}`} style={{position: 'relative'}}>
        <div className="w-12 h-12 rounded-full ring-2 ring-white">
          <img 
            src={conversation.ProfilePic} 
            alt="user avatar"
          />
          <span
            style={{position: 'absolute', top: 2, right: 2, width: 12, height: 12, borderRadius: '50%', border: '2px solid white', backgroundColor: isOnline ? '#22c55e' : '#a3a3a3', display: 'block'}}
            title={isOnline ? "Online" : "Offline"}
          ></span>
        </div>
      </div>
      
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-gray-800 truncate'>{conversation.fullName}</h3>
          <span className='text-xs text-gray-500'>{new Date(conversation.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <p className='text-sm text-gray-600 truncate'>{conversation.lastMessage || 'No messages yet'}</p>
      </div>
    </div>
  )
}

export default Conversation
