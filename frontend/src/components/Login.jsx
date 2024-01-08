import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    setUsername('')
    setPassword('')

    if(!username  || !password){
      return alert('All fields are required')
    }

    axios.post(`${window.location.origin}/login`,{username,password})
    .then((response)=>{
      if(response.status==200){
        localStorage.setItem('loggedin',true)
        localStorage.setItem('email',response.data.email)
        localStorage.setItem('username',response.data.username)
        window.location.href='/home'
       
      }
       
    }).catch((error)=>{
      if(error.response && error.response.status === 422) alert('Invalid username or password')
    })
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-primary">
      <form onSubmit={handleLogin} className="w-45 bg-white p-3 rounded">
        <h1>Login</h1>
        <div>
          <label htmlFor="">User Name</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>


        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control  mb-3"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button className="btn btn-success w-100">Login</button>
        <p>Do not have an account?</p>
        <Link to={`/register`} className="btn btn-primary">Register</Link>
      </form>
    </div>
  )
}

export default Login
