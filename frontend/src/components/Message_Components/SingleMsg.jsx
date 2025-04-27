import React from 'react'
import useConversation from '../../zustand/useConversation'

function SingleMsg({ message = "Hello there!", sender = true, time = "12:45", status = "Delivered" }) {
  const { selectedConversation } = useConversation();

  return (
    <div className={`flex ${sender ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {!sender && (
        <div className="avatar">
          <div className="w-8 h-8 rounded-full ring-1 ring-gray-200">
            <img
              alt="User avatar"
              src={selectedConversation?.ProfilePic} />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${sender ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div className={`rounded-2xl px-4 py-2 ${
          sender 
            ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-500">{time}</span>
          {sender && (
            <span className="text-xs text-gray-500">
              {status === "Delivered" ? "✓" : status === "Seen" ? "✓✓" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleMsg
