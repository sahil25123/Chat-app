  import React from 'react'
import MessageInput from './MessageInput'
import Messages from './Messages'
  
  function MessageContainer() {
    const NoChatSelected = true;
    return (
      <div className='md:min-w-[450px] flex flex-col'>
        <span className='bg-slate-500 px-4 py-2 mb-2'></span>
        <span className='text-grey-900 font-bold'>John Deo</span>

        <Messages/>
        <MessageInput/>
        
      </div>
    )
  }
  
  export default MessageContainer

  const NoChatSelected = () =>{
    return (
      <div className='flex items-center justify-center w-full h-full '>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font semibold flex flex-col items-center gap-2'>
          <p>Welcome John Deo </p>
          <p>Select a chat to start message</p>
          <TiMessages className="text-3xl md:text-6xl text-center"/>
        </div>
      </div>

    )


  }
  