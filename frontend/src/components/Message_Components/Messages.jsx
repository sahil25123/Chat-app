import React from 'react'
import SingleMsg from './singleMsg'

function Messages() {
  return (
    <div className='px-4 flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
      <div className='flex flex-col gap-2 py-2'>
        <SingleMsg />
        <SingleMsg />
        <SingleMsg />
        <SingleMsg />
        <SingleMsg />
      </div>
    </div>
  )
}

export default Messages
