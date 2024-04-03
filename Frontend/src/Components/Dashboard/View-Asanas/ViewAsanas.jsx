import React, { useState, useEffect } from "react";
import axios from 'axios';

const ViewAsanas = () => {
  const [asanas, setAsanas] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/asana/view-asanas');
      setAsanas(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: asanas }} />
  );
}

export default ViewAsanas;
