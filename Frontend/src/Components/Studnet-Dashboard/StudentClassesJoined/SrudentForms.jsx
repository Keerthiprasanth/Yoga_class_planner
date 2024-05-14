import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentSequence = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        // Retrieve token from session storage
        const token = sessionStorage.getItem('token');
        // Decode token to access user information
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        // Extract student ID from decoded token
        const studentId = decodedToken.id;

        const response = await axios.get(`http://localhost:3001/api/student-forms/${studentId}`);
        setForms(response.data.forms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student forms:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Student Forms</h1>
      {forms.map(form => (
        <div key={form._id}>
          <h2>{form.name}</h2>
          <p>Description: {form.description}</p>
          {/* Display suggested sequences */}
          <h3>Suggested Sequences</h3>
          {form.suggestedSequences.map(sequence => (
            <div key={sequence._id}>
              <h4>Sequence Name: {sequence.sequenceId.name}</h4>
              <p>Description: {sequence.sequenceId.description}</p>
              {/* Render images and benefits if asanas length is greater than 1 */}
              {sequence.sequenceId.asanas.length > 1 && (
                <div>
                  <h5>Images and Benefits:</h5>
                  {sequence.sequenceId.asanas.map(asana => (
                    <div key={asana._id}>
                      <img src={asana.image[0]} alt={asana.name} />
                      <p>{asana.benefits[0]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StudentSequence;
