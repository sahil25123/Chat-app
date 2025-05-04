import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../hooks/useGetConversation';

function Conversations() {
  const {loading , conversations} = useGetConversation();
  // console.log("Conversations:" , conversations)
  
  return (
    <div className='space-y-2 px-2'>
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))
      ) : (
        <div className="text-center text-gray-500">No conversations found</div>
      )}
    </div>
  )
}

export default Conversations
