import React from 'react'
import SingleMsg from './singleMsg'

function Messages() {
  return (
    <div className='px-6 py-4 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
      <div className='flex flex-col gap-4'>
        <SingleMsg message="Hey there! How are you doing?" sender={false} time="10:30 AM" />
        <SingleMsg message="I'm doing great! How about you?" sender={true} time="10:31 AM" />
        <SingleMsg message="Just finished my project, feeling good!" sender={false} time="10:32 AM" />
        <SingleMsg message="That's awesome! Want to grab coffee later?" sender={true} time="10:33 AM" />
        <SingleMsg message="Sure, sounds good! Let's meet at 3 PM?" sender={false} time="10:34 AM" />
      </div>
    </div>
  )
}

export default Messages
