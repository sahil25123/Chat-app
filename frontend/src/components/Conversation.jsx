import React from 'react'

function Conversation() {
  return (
    <div className='flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors'>
      <div className="avatar online">
        <div className="w-12 h-12 rounded-full ring-2 ring-white">
          <img 
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
            alt="user avatar"
          />
        </div>
      </div>
      
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold text-gray-800 truncate'>John Doe</h3>
          <span className='text-xs text-gray-500'>10:30 AM</span>
        </div>
        <p className='text-sm text-gray-600 truncate'>Hey, how are you doing?</p>
      </div>
    </div>
  )
}

export default Conversation
