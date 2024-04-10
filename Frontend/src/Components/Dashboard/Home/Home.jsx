import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import $ from 'jquery'; // Import jQuery for modal handling
import ViewAsanasComponent from '../View-Asanas/ViewAsanas';


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log('Stored User:', storedUser);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // Allowed extensions
    if (!allowedExtensions.exec(file.name)) {
      alert('Please upload an image file (jpg, jpeg, png, or gif)');
      event.target.value = ''; // Clear the input field
      return false;
    }
  };

  const saveChanges = () => {
    // Retrieve the bearer token from session storage
    const token = sessionStorage.getItem('token');

    // Get input values
    const asanaName = document.getElementById('asanaName').value;
    const asanaDescription = document.getElementById('asanaDescription').value;
    const asanaBenefits = document.getElementById('asanaBenefits').value;
    const asanaImage = document.getElementById('asanaImage').files[0]; // Get the first selected file

    // Set up FormData to include text data and the image
    const formData = new FormData();
    formData.append('name', asanaName);
    formData.append('description', asanaDescription);
    formData.append('benefits', asanaBenefits);
    formData.append('image', asanaImage);

    // Set up headers with the bearer token
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
    };

    // Make API request using Axios
    axios.post('http://localhost:3001/api/asana/add-asana', formData, {
      headers: headers
    })
    .then(response => {
      console.log('API Response:', response.data);
      // Display alert box upon successful image upload
      alert('Image added successfully!');
      // Close the modal
      $('#exampleModalLong').modal('hide');
    })
    .catch(error => {
      console.error('API Error:', error);
      // Handle error (if needed)
    });
  };

  return (
    <div className="dashboard">
    <div className="home" >
      <div className="col-5 username-zone" style={{
   
        justifyContent: "left",
        padding: "100px"
      }}>
      
        <div className="app-name">
          Welcome to Yoga Planner <h2> {user ? capitalizeFirstLetter(user) : ''} </h2>
        </div>
        <div className="add-asanas">
        As a teacher You can add Asanas by clicking below
          <br />
          <button type="button" className="button mt-2" data-toggle="modal" data-target="#exampleModalLong">
            Add asanas
          </button>
          <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle" style={{color:"black"}}>Add Asanas</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="asanaName">Name:</label>
                    <input type="text" className="form-control" id="asanaName" placeholder="Enter asana name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="asanaDescription">Description:</label>
                    <textarea className="form-control" id="asanaDescription" rows="3" placeholder="Enter asana description" required></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="asanaBenefits">Benefits:</label>
                    <textarea className="form-control" id="asanaBenefits" rows="3" placeholder="Enter asana benefits" required></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="asanaImage">Image Upload:</label>
                    <input type="file" className="form-control-file" id="asanaImage" accept="image/*" onChange={handleFileChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="button" data-dismiss="modal">Close</button>
                  <button type="button" className="button" onClick={saveChanges}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    </div>
  );
}

export default Home;
