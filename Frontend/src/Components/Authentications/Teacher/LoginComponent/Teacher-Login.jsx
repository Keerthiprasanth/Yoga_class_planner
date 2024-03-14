import React, { useState } from 'react';
const Login =() =>{
    const [formData , setformData] = useState({
      email:'',
      password:'',
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      setformData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(formData);
    }
  
    return(
      <div className="container col-12">
        <div className="card">
        <h5>
          Login
        </h5>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required></input>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
          <span>New user? <a href ="/teacher-signup">Register</a> here</span>
          <button type="submit" className="login-button">Submit</button>
          </form>
          </div>
      </div>
    );
  }
  
  export default Login