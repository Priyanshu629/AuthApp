import  { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    
    const navigate=useNavigate()
    let user=localStorage.getItem('loggedin')
    let email=localStorage.getItem('email')
    let username=localStorage.getItem('username')

 
    const logout=()=>{
      localStorage.clear()
      navigate('/')
    }
   
      if(!user){
       return window.location.href='/'
    }

  return (
    <div className='p-3'>
     <h2>Welcome {username}</h2> 
     <h2>Your Email:{email}</h2>
     <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  ) 
    
}

export default Home
