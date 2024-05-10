import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Sequenc.css'
import HeaderComponent from "../Header/Header";

const Sequence = () => {
  const [asanas, setAsanas] = useState([]);
  const [visibleAsanas, setVisibleAsanas] = useState(3); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsanas, setSelectedAsanas] = useState([]);
  const [selectedAsanasBox, setSelectedAsanasBox] = useState([]);

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

  const handleAddAsana = (asanaId) => {
    setSelectedAsanas(prev => [...prev, asanaId]);
  };

  const handleRemoveAsana = (asanaId) => {
    setSelectedAsanas(prev => prev.filter(id => id !== asanaId));
  };

  const handleAddToBox = async () => {
    try {
      setSelectedAsanasBox(selectedAsanas);
      setSelectedAsanas([]);
    } catch (error) {
      console.error('Error adding asanas to the box:', error);
    }
  };

  const filteredAsanas = asanas.filter(asana => 
    asana.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="asanas-container col-12">
      <h3>Asanas</h3>
      <input
        type="text"
        placeholder="Search asanas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <br></br>
      <div className="image-box">
        {filteredAsanas.slice(0, visibleAsanas).map((asana, index) => (
          <div className="col-md-4" key={asana._id}>
            <div className="card mb-4">
              <img src={asana.image} className="card-img-top" alt={asana.name} />
              <div className="card-body">
                <h5 className="card-title">Asana name: {asana.name}</h5>
                <p>Benefits</p>
                {asana.benefits.length > 0 && (
                  <ul>
                    {asana.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
                {selectedAsanas.includes(asana._id) ? (
                  <button onClick={() => handleRemoveAsana(asana._id)}>Remove</button>
                ) : (
                  <button onClick={() => handleAddAsana(asana._id)}>Add</button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          {visibleAsanas < filteredAsanas.length && (
            <button className="button-primary col-12" onClick={loadMore}>Load More</button>
          )}
          {selectedAsanas.length > 0 && (
            <button className="button col-12" onClick={handleAddToBox}>Add</button>
          )}
        </div>
      </div>
      <div className="selected-asanas-box">
        <h3>Selected Asanas</h3>
        <ul>
          {selectedAsanasBox.map(asanaId => (
            <li key={asanaId}>{asanaId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sequence;
