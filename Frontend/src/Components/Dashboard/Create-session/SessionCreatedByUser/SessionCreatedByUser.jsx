import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const SessionCreatedByUser = () => {
  const [classes, setClasses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/class/teacher-classes', {
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
      await axios.delete(`http://localhost:3001/api/class/delete-class/${classToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted class from the state
      setClasses(classes.filter(classItem => classItem._id !== classToDelete));
      // Close the modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleFormsClick = async (studentId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/form/student-forms?studentId=${studentId._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedForm(response.data.forms[0]);
      setShowFormModal(true);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  return (
    <div>
      <h1>Classes</h1>
      <div className="class-box-container">
        {classes.map((classItem) => (
          <div className="class-box" key={classItem._id}>
            <h2>{classItem.className}</h2>
            <p>Description: {classItem.description}</p>
            <p>Date: {new Date(classItem.date).toLocaleDateString()}</p>
            <p>Time: {classItem.time}</p>
            <p>Duration: {classItem.duration} minutes</p>
            <p>Max Capacity: {classItem.maxCapacity}</p>
            <Button variant="danger" onClick={() => handleDeleteClick(classItem._id)}>Delete</Button>
            <h3>Students:</h3>
            <ul>
              {classItem.students.map((student) => (
                <li key={student.bookingId}>
                  {student.studentId.name} 
                  <button onClick={() => handleFormsClick(student.studentId._id)}>Forms</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this class?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student Forms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedForm && (
            <div>
              <h3>General Health:</h3>
              <p>Existing Medical Conditions: {selectedForm.generalHealth.existingMedicalConditions}</p>
              <p>Medications: {selectedForm.generalHealth.medications}</p>
              <p>Surgeries or Injuries: {selectedForm.generalHealth.surgeriesOrInjuries}</p>
              <p>Allergies: {selectedForm.generalHealth.allergies}</p>
              <h3>Physical Health:</h3>
              <p>Chronic Pain: {selectedForm.physicalHealth.chronicPain}</p>
              <p>Sensitive Areas: {selectedForm.physicalHealth.sensitiveAreas}</p>
              <p>Physical Limitations: {selectedForm.physicalHealth.physicalLimitations}</p>
              <h3>Yoga Experience:</h3>
              <p>Practiced Before: {selectedForm.yogaExperience.practicedBefore}</p>
              <p>Yoga Styles: {selectedForm.yogaExperience.yogaStyles}</p>
              <p>Goals: {selectedForm.yogaExperience.goals}</p>
              <p>Avoid Poses: {selectedForm.yogaExperience.avoidPoses}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFormModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SessionCreatedByUser;
