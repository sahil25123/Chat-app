import React from 'react'
import { CiLogout } from "react-icons/ci";

function LogoutBtn() {
  return (
    <button className='flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity'>
      <CiLogout className="w-5 h-5" />
      <span className='font-medium'>Logout</span>
    </button>
  )
}

export default LogoutBtn
