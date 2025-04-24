import React from 'react'
import SearchBar from './SearchBar'
import Conversation from './Conversation'
import Login from '../pages/Login'
import LogoutBtn from './LogoutBtn'
import Converations from './Converations'

function SideBar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchBar/> 
        <div className='divider px-3'></div>
       <Converations/>
        <LogoutBtn/>
      
    </div>
  )
}

export default SideBar
