import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Sequence from './Sequence';

const SequenceUI = ({ studentId }) => { // Accept studentId prop
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [],
    asanaIds: [],
  });
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [lastSequenceId, setLastSequenceId] = useState(null); // State to store the ID of the last added sequence
  const [sequenceIdsToSend, setSequenceIdsToSend] = useState([]); // State to store sequence IDs to send

  useEffect(() => {
    fetchLastSequenceId();
  }, []);

  const fetchLastSequenceId = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/sequence/view-sequences');
      const sequences = response.data.sequences;
      if (sequences.length > 0) {
        const lastSequence = sequences[sequences.length - 1];
        setLastSequenceId(lastSequence._id);
      }
    } catch (error) {
      console.error('Error fetching sequences:', error);
    }
  };

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
      const response = await axios.post('http://localhost:3001/api/sequence/add-sequence', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setFormData({
        name: '',
        description: '',
        benefits: [],
      });
      setShowSequenceModal(false);
      setLastSequenceId(response.data._id); // Update lastSequenceId with the ID of the last added sequence
    } catch (error) {
      console.error('Error adding sequence:', error);
    }
  };

  const handleSend = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://localhost:3001/api/form/suggest-sequence/${studentId}`, { // Use studentId here
        sequenceIds: [...sequenceIdsToSend, lastSequenceId] 
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setSequenceIdsToSend([]); 
    } catch (error) {
      console.error('Error sending sequence to student:', error);
    }
  };

  const toggleSequenceModal = () => {
    setShowSequenceModal(prev => !prev);
  };

  const handleAddToBox = (selectedAsanas) => {
    setFormData(prevData => ({
      ...prevData,
      asanaIds: selectedAsanas,
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
        <button onClick={handleSend} disabled={!lastSequenceId}>Send</button>
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
