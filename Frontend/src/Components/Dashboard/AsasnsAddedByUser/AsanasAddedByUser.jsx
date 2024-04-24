
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AsanasAddedByUser.css'; 

const AsanasAddedByUser = () => {
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    id: '',
    name: '',
    description: '',
    benefits: [],
    asanaType: '',
    image: ''
  });

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
      
        const token = sessionStorage.getItem('token');

       
        const response = await axios.get('http://localhost:3001/api/asana/teacher-asanas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAsanas(response.data.asanas);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching asanas:', error);
      }
    };

    fetchAsanas();
  }, []);

  const handleUpdateModal = (asana) => {
    setShowUpdateModal(true);
    setUpdateFormData({
      id: asana._id,
      name: asana.name,
      description: asana.description,
      benefits: asana.benefits,
      asanaType: asana.asanaType,
      image: asana.image
    });
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
   
      const token = sessionStorage.getItem('token');


      const response = await axios.put(`http://localhost:3001/api/asana/update/${updateFormData.id}`, updateFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

  
      const updatedAsanas = asanas.map(asana => {
        if (asana._id === updateFormData.id) {
          return response.data.asana;
        }
        return asana;
      });

      setAsanas(updatedAsanas);
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating asana:', error);
    }
  };

  const handleDelete = async (id) => {
    try {

      const token = sessionStorage.getItem('token');

  
      await axios.delete(`http://localhost:3001/api/asana/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAsanas(asanas.filter((asana) => asana._id !== id));
    } catch (error) {
      console.error('Error deleting asana:', error);
    }
  };

  return (
    <div className="asanas-container">
      <h2>Asanas Added by You</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="image-box">
          {asanas.map((asana) => (
            <div className="card" key={asana._id}>
              <img className="card-img-top" src={asana.image} alt={asana.name} />
              <div className="card-body">
                <h5 className="card-title">{asana.name}</h5>
                <p className="card-description">Description: {asana.description}</p>
                <p className="card-added-by">Added By: {asana.addedByName}</p>
                <ul className="card-benefits">
                  <li>Benefits:</li>
                  {asana.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                <div className="card-buttons">
                  <button className="update-button" onClick={() => handleUpdateModal(asana)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(asana._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showUpdateModal && (
        <div className="update-modal">
          <div className="modal-content">
            <span className="close" onClick={handleUpdateClose}>&times;</span>
            <form onSubmit={handleUpdateSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updateFormData.name}
                onChange={handleUpdateChange}
           
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={updateFormData.description}
                onChange={handleUpdateChange}
              
              ></textarea>

              <label htmlFor="benefits">Benefits:</label>
              <input
                type="text"
                id="benefits"
                name="benefits"
                value={updateFormData.benefits}
                onChange={handleUpdateChange}
               
              />

              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleUpdateChange}
              />
              <button type="submit" className="save-button">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsanasAddedByUser;
