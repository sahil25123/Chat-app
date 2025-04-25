import React from 'react'

function SingleMsg({ message = "Hello there!", sender = true, time = "12:45", status = "Delivered" }) {
  return (
    <div className={`chat ${sender ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="chat-header text-gray-300">
        {sender ? 'You' : 'Obi-Wan Kenobi'}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className={`chat-bubble ${sender ? 'bg-blue-600' : 'bg-gray-700'} text-white`}>
        {message}
      </div>
      {sender && (
        <div className="chat-footer opacity-50 text-xs">
          {status}
        </div>
      )}
    </div>
  )
}

export default SingleMsg
