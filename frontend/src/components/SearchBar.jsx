import React from 'react'
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div>
        <form className='flex items-center gap-2'>
            <input type='text' placeholder='Search...' className='input input-bordered rounded-full'></input>
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'> <FaSearch /> </button>
        </form>
      
    </div>
  )
}

export default SearchBar
