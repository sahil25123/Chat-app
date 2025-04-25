import React from 'react'
import {BsSend} from "react-icons/bs"

function MessageInput() {
  return (
    <form className='px-4 my-3'>
        <div className='w-full'>
            <input className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white' placeholder='send a Message' type="text"></input>
            <button type='submit' className='absoulte inset-y-0 flex items-centre pe-3'>
                <BsSend/>
            </button>

        </div>

    </form>
  )
}

export default MessageInput
