import React from 'react'
import { CiLogout } from "react-icons/ci";
import useLogout from '../hooks/useLogout';

function LogoutBtn() {
  const { loading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className='flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
      aria-label="Logout"
      role="button"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          <CiLogout className="w-5 h-5" />
          <span className='font-medium'>Logout</span>
        </>
      )}
    </button>
  )
}

export default LogoutBtn
