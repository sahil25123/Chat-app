import React from 'react'
import SearchBar from './SearchBar'
import Conversation from './Conversation'
import LogoutBtn from './LogoutBtn'
import Converations from './Converations'

function SideBar() {
  return (
    <div className='flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      <div className='card w-full h-full bg-white/80 backdrop-blur-sm shadow-xl border border-white/30'>
        <div className='card-body p-4 flex flex-col h-full'>
          {/* Header */}
          <div className='flex flex-col items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-1'>ChatterBox</h2>
            <p className='text-sm text-gray-600'>Your conversations</p>
          </div>

          {/* Search Bar */}
          <div className='mb-4'>
            <SearchBar />
          </div>

          {/* Divider */}
          <div className='divider my-2'></div>

          {/* Conversations */}
          <div className='flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100'>
            <Converations />
          </div>

          {/* Logout Button */}
          <div className='mt-auto pt-4 border-t border-gray-200'>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
