

import { Route, Router , Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signup'

function App() {
  

  return (
    <>
    <div className='p-4 h-screen flex items-center justify-center'>
     <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/' element= {<Home/>}/>
     </Routes>

    </div>
   
    </>
  )
}

export default App
