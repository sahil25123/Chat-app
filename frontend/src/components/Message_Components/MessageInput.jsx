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
    <form onSubmit={handleSubmit} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type="text"
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='absolute inset-y-0 right-0 flex items-center pe-3 text-blue-500 hover:text-blue-400 transition-colors'
        >
          <BsSend className='w-5 h-5' />
        </button>
      </div>
    </form>
  )
}

export default MessageInput
