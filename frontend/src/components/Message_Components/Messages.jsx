import React from 'react'
import SingleMsg from './singleMsg'

function Messages() {
  return (
    <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-400'>
      <div className='px-6 py-4 space-y-4'>
        <SingleMsg message="Hey there! How are you doing?" sender={false} time="10:30 AM" />
        <SingleMsg message="I'm doing great! How about you?" sender={true} time="10:31 AM" />
        <SingleMsg message="Just finished my project, feeling good!" sender={false} time="10:32 AM" />
        <SingleMsg message="That's awesome! Want to grab coffee later?" sender={true} time="10:33 AM" />
        <SingleMsg message="Sure, sounds good! Let's meet at 3 PM?" sender={false} time="10:34 AM" />
        <SingleMsg message="Perfect! See you then!" sender={true} time="10:35 AM" />
        <SingleMsg message="Looking forward to it!" sender={false} time="10:36 AM" />
        <SingleMsg message="Me too! Have a great day!" sender={true} time="10:37 AM" />
        <SingleMsg message="You too! Take care!" sender={false} time="10:38 AM" />
        <SingleMsg message="Bye!" sender={true} time="10:39 AM" />
      </div>
    </div>
  )
}

export default Messages
