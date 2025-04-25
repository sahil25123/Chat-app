import React from 'react'
import SideBar from '../components/SideBar'
import MessageContainer from '../components/Message_Components/MessageContainer'

function Home() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Sidebar */}
      <div className="w-1/3 lg:w-1/4 h-full">
        <SideBar />
      </div>
      
      {/* Message Container */}
      <div className="flex-1 h-full">
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home