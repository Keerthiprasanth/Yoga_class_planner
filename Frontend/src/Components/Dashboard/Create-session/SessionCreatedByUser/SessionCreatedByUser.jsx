import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Sequence from '../../Sequence/Sequence'; // Import the Sequence component
import SequenceUI from '../../Sequence/SequenceUI';

const SessionCreatedByUser = () => {
  const [classes, setClasses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: '',
    addedByName: '',
    addedById: ''
  });
  const [sequences, setSequences] = useState([]);

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
      setClasses(classes.filter(classItem => classItem._id !== classToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleFormsClick = async (studentId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/form/student-forms/${studentId}`, {
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

  const handleOpenSequenceModal = () => {
    setShowSequenceModal(true);
  };

  const handleCloseSequenceModal = () => {
    setShowSequenceModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (sequenceId) => {
    // Handle sequence deletion
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
    {student.studentId && student.studentId.name} {/* Add conditional check */}
    <button onClick={() => handleFormsClick(student.studentId && student.studentId._id)}>Forms</button> {/* Add conditional check */}
    <button onClick={handleOpenSequenceModal}>Suggest Sequence</button>
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
          {selectedForm ? (
            <div>
              <h3>General Health:</h3>
              <p>Existing Medical Conditions: {selectedForm.generalHealth && selectedForm.generalHealth.existingMedicalConditions}</p>
              <p>Medications: {selectedForm.generalHealth && selectedForm.generalHealth.medications}</p>
              <p>Surgeries or Injuries: {selectedForm.generalHealth && selectedForm.generalHealth.surgeriesOrInjuries}</p>
              <p>Allergies: {selectedForm.generalHealth && selectedForm.generalHealth.allergies}</p>
              <h3>Physical Health:</h3>
              <p>Chronic Pain: {selectedForm.physicalHealth && selectedForm.physicalHealth.chronicPain}</p>
              <p>Sensitive Areas: {selectedForm.physicalHealth && selectedForm.physicalHealth.sensitiveAreas}</p>
              <p>Physical Limitations: {selectedForm.physicalHealth && selectedForm.physicalHealth.physicalLimitations}</p>
              <h3>Yoga Experience:</h3>
              <p>Practiced Before: {selectedForm.yogaExperience && selectedForm.yogaExperience.practicedBefore}</p>
              <p>Yoga Styles: {selectedForm.yogaExperience && selectedForm.yogaExperience.yogaStyles}</p>
              <p>Goals: {selectedForm.yogaExperience && selectedForm.yogaExperience.goals}</p>
              <p>Avoid Poses: {selectedForm.yogaExperience && selectedForm.yogaExperience.avoidPoses}</p>
            </div>
          ) : (
            <p>No form selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFormModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSequenceModal} onHide={handleCloseSequenceModal}> {/* Sequence Modal */}
        <Modal.Header closeButton>
          <Modal.Title>Sequence Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SequenceUI /> {/* Render the Sequence component here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSequenceModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SessionCreatedByUser;
