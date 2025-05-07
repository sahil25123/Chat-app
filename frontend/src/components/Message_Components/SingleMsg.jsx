import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'

function SingleMsg({ message }) {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  
  // Debug logging
 

  const shakeCls = message.shouldShake ? "shake" : ""
  
  if (!message || !message.senderId) {
    console.error("Invalid message data:", message);
    return null;
  }

  const isSender = message.senderId._id === authUser._id;

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {!isSender && (
        <div className="avatar">
          <div className="w-8 h-8 rounded-full ring-1 ring-gray-200">
            <img
              alt="User avatar"
              src={message.senderId.ProfilePic || "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"}
              onError={(e) => { e.target.src = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"; }}
            />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isSender 
            ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        } ${shakeCls}`}>
          <p className="text-sm">{message.message}</p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isSender && (
            <span className="text-xs text-gray-500">
              {message.status === "delivered" ? "✓" : message.status === "seen" ? "✓✓" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleMsg
