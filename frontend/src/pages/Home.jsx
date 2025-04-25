import React from 'react'
import SideBar from '../components/SideBar'
import MessageContainer from '../components/Message_Components/MessageContainer'

function Home() {
  return (
    <div className="flex min-h-[80vh] w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-white/30 bg-white/80 backdrop-blur-sm">
      {/* Sidebar - matches the card styling from login */}
      <div className="hidden md:flex md:w-1/3 lg:w-1/4 bg-gradient-to-b from-purple-50 to-blue-50 border-r border-white/30">
        <SideBar />
      </div>
      
      <MessageContainer/>
      
    </div>
  )
}

export default Home