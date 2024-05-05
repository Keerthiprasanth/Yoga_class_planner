import React, { useState } from 'react';
import axios from 'axios';

const Forms = () => {
  const [formData, setFormData] = useState({
    existingMedicalConditions: '',
    medications: '',
    surgeriesOrInjuries: '',
    allergies: '',
    chronicPain: '',
    sensitiveAreas: '',
    physicalLimitations: '',
    practicedBefore: '',
    yogaStyles: '',
    goals: '',
    avoidPoses: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
        await axios.post('https://localhost:3001/api/form/submit-form', formData, { headers });

        setFormData({
        existingMedicalConditions: '',
        medications: '',
        surgeriesOrInjuries: '',
        allergies: '',
        chronicPain: '',
        sensitiveAreas: '',
        physicalLimitations: '',
        practicedBefore: '',
        yogaStyles: '',
        goals: '',
        avoidPoses: ''
      });
    
      document.getElementById('formsModal').classList.remove('show');
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleCancel = () => {

    setFormData({
      existingMedicalConditions: '',
      medications: '',
      surgeriesOrInjuries: '',
      allergies: '',
      chronicPain: '',
      sensitiveAreas: '',
      physicalLimitations: '',
      practicedBefore: '',
      yogaStyles: '',
      goals: '',
      avoidPoses: ''
    });

    document.getElementById('formsModal').classList.remove('show');
  };

  return (
    <div className="form-container">
      <form>
        
        <div className="form-group">
          <label htmlFor="existingMedicalConditions">Do you have any existing medical conditions?</label>
          <input type="text" id="existingMedicalConditions" name="existingMedicalConditions" value={formData.existingMedicalConditions} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="medications">Are you currently taking any medications?</label>
          <input type="text" id="medications" name="medications" value={formData.medications} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="surgeriesOrInjuries">Have you had any recent surgeries or injuries?</label>
          <input type="text" id="surgeriesOrInjuries" name="surgeriesOrInjuries" value={formData.surgeriesOrInjuries} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="allergies">Do you have any allergies?</label>
          <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="chronicPain">Do you experience any chronic pain or discomfort?</label>
          <input type="text" id="chronicPain" name="chronicPain" value={formData.chronicPain} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sensitiveAreas">Are there any areas of your body that are particularly sensitive or injured?</label>
          <input type="text" id="sensitiveAreas" name="sensitiveAreas" value={formData.sensitiveAreas} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="physicalLimitations">Do you have any physical limitations or mobility issues?</label>
          <input type="text" id="physicalLimitations" name="physicalLimitations" value={formData.physicalLimitations} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="yogaStyles">Have you practiced yoga before?</label>
          <input type="text" id="yogaStyles" name="yogaStyles" value={formData.yogaStyles} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="goals">Are there any specific goals or areas of focus you have for your yoga practice?</label>
          <input type="text" id="goals" name="goals" value={formData.goals} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="avoidPoses">Are there any poses or movements you prefer to avoid?</label>
          <input type="text" id="avoidPoses" name="avoidPoses" value={formData.avoidPoses} onChange={handleChange} />
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
