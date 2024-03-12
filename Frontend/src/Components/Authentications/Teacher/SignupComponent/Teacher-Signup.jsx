import React , {useState}from "react";
import "./Teacher-Signup.css"


const TeacherSignup =() =>{

  const [formData , setformData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    
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
        Register
      </h5>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name}  onChange={handleChange} placeholder="Username" required></input>
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required></input>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
        <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required></input>
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required></input>
        <select id="cars" name="cars" onChange={handleChange}>
        <option value="">Select Experience Level</option>
        <option value="volvo">Beginner</option>
        <option value="saab">Intermediate</option>
        <option value="mercedes">Advanced</option>  
        <option value="audi">Expert</option>
      </select>
        <span>Already registered? <a href ="/teacher-login">Login</a></span>
        <button type="submit" className="login-button">Submit</button>
        </form>
       
        </div>
    </div>
    
  );
}

export default TeacherSignup