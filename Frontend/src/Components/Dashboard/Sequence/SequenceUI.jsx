import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import Sequence from './Sequence'; // Import the Sequence component

const SequenceUI = () => {
  const [sequences, setSequences] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    benefits: [],
    asanas: [], // Initialize asanas array in form data
  });
  const [showSequenceModal, setShowSequenceModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Fetch sequences on component mount
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/sequence/add-sequence');
      setSequences(response.data);
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
      const response = await axios.post('http://localhost:3001/api/sequence/add-sequence', formData);
      console.log('Sequence added:', response.data);
      setFormData({
        name: '',
        description: '',
        benefits: [],
        asanas: [], // Clear selected asanas after adding sequence
      });
      fetchSequences(); // Refresh sequences after adding a new one
    } catch (error) {
      console.error('Error adding sequence:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/sequence/${id}`);
      console.log('Sequence deleted');
      fetchSequences(); // Refresh sequences after deletion
    } catch (error) {
      console.error('Error deleting sequence:', error);
    }
  };

  const toggleSequenceModal = () => {
    setShowSequenceModal(prev => !prev); // Toggle the showSequenceModal state
  };

  // Function to update asanas array in formData when adding to box
  const handleAddToBox = (selectedAsanas) => {
    setFormData(prevData => ({
      ...prevData,
      asanas: selectedAsanas
    }));
    setShowSequenceModal(false); // Close the modal after adding asanas to the box
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
        {/* Button to toggle the visibility of the Sequence modal */}
        <Button variant="primary" onClick={toggleSequenceModal}>Add Sequence</Button>
        <br />
        <button type="submit">Add Sequence</button>
      </form>

      <h3>Existing Sequences</h3>
      <ul>
        {sequences.map(sequence => (
          <li key={sequence._id}>
            <div>Name: {sequence.name}</div>
            <div>Description: {sequence.description}</div>
            <div>Added By: {sequence.addedByName}</div>
            <button onClick={() => handleDelete(sequence._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Bootstrap modal for Sequence component */}
      <Modal show={showSequenceModal} onHide={toggleSequenceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sequence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pass handleAddToBox function to Sequence component */}
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
