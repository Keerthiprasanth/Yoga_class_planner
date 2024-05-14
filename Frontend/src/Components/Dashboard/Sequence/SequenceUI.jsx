import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Sequence from './Sequence';

const SequenceUI = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [],
    asanaIds: [],
    addedByName: '', // Adding user name to form data
    addedById: '',   // Adding user id to form data
  });
  const [showSequenceModal, setShowSequenceModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      await axios.post('http://localhost:3001/api/sequence/add-sequence', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Sequence added:', formData);
      setFormData({
        name: '',
        description: '',
        benefits: [],
        addedByName: '', // Resetting user name
        addedById: '',   // Resetting user id
      });
      setShowSequenceModal(false);
    } catch (error) {
      console.error('Error adding sequence:', error);
    }
  };

  const toggleSequenceModal = () => {
    setShowSequenceModal(prev => !prev);
  };

  const handleAddToBox = (selectedAsanas) => {
    // Assuming user name and user id are available in sessionStorage
    const userName = sessionStorage.getItem('userName');
    const userId = sessionStorage.getItem('userId');
    setFormData(prevData => ({
      ...prevData,
      asanaIds: selectedAsanas,
      addedByName: userName,
      addedById: userId,
    }));
    setShowSequenceModal(false);
  };

  return (
    <div>
      <h2>Sequences</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Benefits:
          <input type="text" name="benefits" value={formData.benefits} onChange={handleChange} />
        </label>
        <br />
        <Button variant="primary" onClick={toggleSequenceModal}>Add Sequence</Button>
        <br />
        <button type="submit">Save</button>
      </form>

      <Modal show={showSequenceModal} onHide={toggleSequenceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sequence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Sequence handleAddToBox={handleAddToBox} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleSequenceModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SequenceUI;
