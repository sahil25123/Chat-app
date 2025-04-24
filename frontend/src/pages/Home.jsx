import React from 'react'
import SideBar from '../components/SideBar'

function Home() {
  return (
    <div className='flex  sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden b-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar/>

      {/* <MessgageContainer/> */}
    </div>
  )
}

export default Home
