import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/all-students');
        setStudents(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudents();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/student/register', formData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        password: '',
        birthDate: ''
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="student-container col-5">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <h2>All Students</h2>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <div>Name: {student.name}</div>
            <div>Email: {student.email}</div>
            <div>Birth Date: {student.birthDate}</div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AdminStudent;
