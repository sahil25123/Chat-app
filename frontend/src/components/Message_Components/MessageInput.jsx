import React, { useState, useRef, useEffect } from 'react'
import { BsSend } from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'
import useConversation from '../../zustand/useConversation'

function MessageInput() {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()
  const { addMessage } = useConversation()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || loading) return;
    
    try {
      const sentMessage = await sendMessage(message);
      if (sentMessage) {
        addMessage(sentMessage)
        setMessage("")
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='relative'>
        <input
          ref={inputRef}
          type="text"
          className='w-full pr-12 py-3 px-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-800 placeholder-gray-500'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          type='submit'
          disabled={loading || !message.trim()}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? <div className='loading loading-spinner'></div> : <BsSend className='w-4 h-4' />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
