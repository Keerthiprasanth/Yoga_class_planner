import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ViewAsanas.css'; // Import CSS file for styling

const ViewAsanas = () => {
  const [asanas, setAsanas] = useState([]);

  useEffect(() => {
    // Fetch JSON data from server using Axios
    axios.get('http://localhost:3001/api/asana/view-asanas')
      .then(response => {
        setAsanas(response.data.asanas);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="asanas-container">
      <div className="row">
        {asanas.map(asana => (
          <div className="col-md-4" key={asana._id}>
            <div className="card mb-4">
              <img src={asana.image} className="card-img-top" alt={asana.name} />
              <div className="card-body">
                <h5 className="card-title">{asana.name}</h5>
                <p className="card-text">{asana.description}</p>
                {asana.benefits.length > 0 && (
                  <ul>
                    {asana.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAsanas;
