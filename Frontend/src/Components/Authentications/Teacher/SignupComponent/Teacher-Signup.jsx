import React , {useState}from "react";
import "./Teacher-Signup.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherSignup =() =>{
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    experienceLevel: '',
  });
  const [form,setForm] = useState({
    confirmPassword:'',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    let error = '';
    if (name === 'email' && !emailRegex.test(value)) {
      error = 'Invalid email address';
    } else if (name === 'password' && !passwordRegex.test(value)) {
      error = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long';
    }else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === "confirmPassword") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  };
  const handleSubmit = async (e) => {
    e.preventDefault();   
    console.log(formData)
    try{
      const response = await axios.post('http://localhost:3001/api/student/register', formData);
      console.log("Response " ,response.data);
      setFormData({
        name: '',
        email: '',
        password: '',
        birthDate: '',
        experienceLevel: '',
      
      })
      navigate("/dashboard");
    }catch (error){
      console.error("Error " , error);
    }

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
         <div className="error">{errors.email}</div>
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required></input>
        <div className="error">{errors.password}</div>
        <input className="text" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required></input>
        <div className="error">{errors.confirmPassword}</div>
         <input type="date" name="birthDate" value={formData.age} onChange={handleChange} placeholder="DOB" required  min="1960-01-01" max=""></input>
       


        <select id="cars" name="cars" onChange={handleChange}>
        <option value="">Select Experience Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>  
        <option value="expert">Expert</option>
      </select>
        <span>Already registered? <a href ="/teacher-login">Login</a></span>
        <button type="submit" className="login-button">Submit</button>
        </form>
       
        </div>
    </div>
    
  );
}

export default TeacherSignup