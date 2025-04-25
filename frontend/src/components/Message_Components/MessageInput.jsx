import React, { useState } from 'react'
import { BsSend } from "react-icons/bs"

function MessageInput() {
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    // Handle message sending here
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='relative'>
        <input
          type="text"
          className='w-full pr-12 py-3 px-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-800 placeholder-gray-500'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity'
        >
          <BsSend className='w-4 h-4' />
        </button>
      </div>
    </form>
  )
}

export default MessageInput
