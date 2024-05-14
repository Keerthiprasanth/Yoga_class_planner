import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const StudentClasses = () => {
  const [classes, setClasses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/class/student-classes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };  

    fetchClasses();
  }, []);

  const handleDeleteClick = (classId) => {
    setClassToDelete(classId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/class/withdraw-class/${classToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the withdrawn class from the state
      setClasses(classes.filter(classItem => classItem._id !== classToDelete));
      // Close the modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error withdrawing class:', error);
    }
  };

  const handleWithdrawClick = async (classId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/class/withdraw-class/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the withdrawn class from the state
      setClasses(classes.filter(classItem => classItem._id !== classId));
    } catch (error) {
      console.error('Error withdrawing class:', error);
    }
  };

  return (
    <div className='mt-3 col-12'>
      <h1>My Classes</h1>
      <div className="class-box-container">
        {classes.map((classItem) => (
          <div className="class-box" key={classItem._id}>
            <h2>{classItem.className}</h2>
            <p>Description: {classItem.description}</p>
            <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
            <p>Time: {classItem.time}</p>
            <p>Duration: {classItem.duration} minutes</p>
            <p>Max Capacity: {classItem.maxCapacity}</p>
            <Button variant="danger" onClick={() => handleWithdrawClick(classItem._id)}>Withdraw</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClasses;
