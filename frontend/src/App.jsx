import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import './App.css';

function App() {
  const { authUser } = useAuthContext();

  return (
    <Router>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route 
            path='/' 
            element={authUser ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path='/login' 
            element={authUser ? <Navigate to="/" /> : <Login />} 
          />
          <Route 
            path='/signup' 
            element={authUser ? <Navigate to="/" /> : <Signup />} 
          />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
