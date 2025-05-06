import React, { useState, useRef, useEffect } from 'react'
import { BsSend, BsEmojiSmile } from "react-icons/bs"
import useSendMessage from '../../hooks/useSendMessage'
// import useConversation from '../../zustand/useConversation'
import toast from 'react-hot-toast'

function MessageInput() {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { loading, sendMessage } = useSendMessage()
  // const { addMessage } = useConversation()
  const inputRef = useRef(null)
  const typingTimeout = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleTyping = () => {
    setIsTyping(true)
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }
    typingTimeout.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const validateMessage = (msg) => {
    const trimmedMsg = msg.trim()
    if (trimmedMsg.length === 0) {
      toast.error("Message cannot be empty")
      return false
    }
    if (trimmedMsg.length > 1000) {
      toast.error("Message is too long (max 1000 characters)")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateMessage(message) || loading) return;
    
    try {
      const sentMessage = await sendMessage(message);
      if (sentMessage) {
        setMessage("")
        setIsTyping(false)
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error(error.message || "Failed to send message")
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
          onChange={(e) => {
            setMessage(e.target.value)
            handleTyping()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e)
            }
          }}
          disabled={loading}
          maxLength={1000}
        />
        {/* <div className='absolute right-12 top-1/2 -translate-y-1/2'>
          <button
            type='button'
            className='p-2 text-gray-500 hover:text-primary transition-colors'
            onClick={() => toast.info("Emoji picker coming soon!")}
          >
            <BsEmojiSmile className='w-5 h-5' />
          </button>
        </div> */}
        <button
          type='submit'
          disabled={loading || !message.trim()}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? (
            <div className='loading loading-spinner loading-sm'></div>
          ) : (
            <BsSend className='w-4 h-4' />
          )}
        </button>
      </div>
      {isTyping && (
        <p className='text-xs text-gray-500 mt-1 ml-4'>Typing...</p>
      )}
    </form>
  )
}

export default MessageInput
