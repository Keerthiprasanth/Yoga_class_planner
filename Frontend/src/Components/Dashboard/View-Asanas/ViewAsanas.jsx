import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ViewAsanas.css'; 

const ViewAsanas = () => {
  const [asanas, setAsanas] = useState([]);
  const [visibleAsanas, setVisibleAsanas] = useState(3); 

  useEffect(() => {
    axios.get('http://localhost:3001/api/asana/view-asanas')
      .then(response => {
        setAsanas(response.data.asanas);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const loadMore = () => {
    setVisibleAsanas(prev => prev + 3);
  }

  return (
    <div className="asanas-container col-12">
      <h3>Asasnas added by you</h3>
      <br></br>
      <div className="image-box">
      {asanas.slice(0, visibleAsanas).map((asana, index) => (
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
      <div className="text-center">
        {visibleAsanas < asanas.length && (
          <button className="button col-12" onClick={loadMore}>Load More</button>
        )}
      </div>
      </div>
    </div>
  );
}

export default ViewAsanas;
