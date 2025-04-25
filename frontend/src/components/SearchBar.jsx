import React from 'react'
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className='relative'>
      <input 
        type='text' 
        placeholder='Search conversations...' 
        className='w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-800 placeholder-gray-500'
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  )
}

export default SearchBar
