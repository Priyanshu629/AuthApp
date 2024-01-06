import  { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
    if (!username || !email || !password) {
      return alert("All fields are required");
    }

    
     axios
      .post(`${window.location.origin}/register`, { username, email, password })
      .then((response)=>{
        if(response.status==200){
          alert('Registration successfull')
        }
      } ).catch((err)=>err)
      
    }
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-primary">
      <form onSubmit={handleRegister} className="w-45 bg-white p-3 rounded">
        <h1>Register Yourself</h1>
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
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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

        <button className="btn btn-success w-100">Register</button>
        <p>Already have an account?</p>
        <Link to={`/`} className="btn btn-primary">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
