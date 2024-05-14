import React, { useState } from 'react';
import axios from 'axios';

const Forms = () => {
  const initialFormData = {
    generalHealth: {
      existingMedicalConditions: "",
      medications: "",
      surgeriesOrInjuries: "",
      allergies: ""
    },
    physicalHealth: {
      chronicPain: "",
      sensitiveAreas: "",
      physicalLimitations: ""
    },
    yogaExperience: {
      practicedBefore: "",
      yogaStyles: "",
      goals: "",
      avoidPoses: ""
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [group, field] = name.split('.');
    setFormData(prevFormData => ({
      ...prevFormData,
      [group]: {
        ...prevFormData[group],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      await axios.post('http://localhost:3001/api/form/submit-form', formData, { headers });
      alert("Form submitted successfully.");
      console.log("hi", formData)
    } catch (error) {
      alert('Error submitting form data:', error);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="form-container">
      <form>
        <h2>General Health</h2>
        <div className="form-group">
          <label htmlFor="existingMedicalConditions">Existing Medical Conditions</label>
          <input type="text" id="existingMedicalConditions" name="generalHealth.existingMedicalConditions" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="medications">Medications</label>
          <input type="text" id="medications" name="generalHealth.medications" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="surgeriesOrInjuries">Surgeries or Injuries</label>
          <input type="text" id="surgeriesOrInjuries" name="generalHealth.surgeriesOrInjuries" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="allergies">Allergies</label>
          <input type="text" id="allergies" name="generalHealth.allergies"  onChange={handleChange} />
        </div>
        
        <h2>Physical Health</h2>
        <div className="form-group">
          <label htmlFor="chronicPain">Chronic Pain</label>
          <input type="text" id="chronicPain" name="physicalHealth.chronicPain"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sensitiveAreas">Sensitive Areas</label>
          <input type="text" id="sensitiveAreas" name="physicalHealth.sensitiveAreas"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="physicalLimitations">Physical Limitations</label>
          <input type="text" id="physicalLimitations" name="physicalHealth.physicalLimitations" onChange={handleChange} />
        </div>

        <h2>Yoga Experience</h2>
        <div className="form-group">
          <label htmlFor="practicedBefore">Practiced Before</label>
          <input type="text" id="practicedBefore" name="yogaExperience.practicedBefore" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="yogaStyles">Yoga Styles</label>
          <input type="text" id="yogaStyles" name="yogaExperience.yogaStyles"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="goals">Goals</label>
          <input type="text" id="goals" name="yogaExperience.goals"  onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="avoidPoses">Avoid Poses</label>
          <input type="text" id="avoidPoses" name="yogaExperience.avoidPoses" onChange={handleChange} />
        </div>

        <div className='col-12  row'>
          <div className="save">
            <button type="button" className="col-5 mr-3" onClick={handleSave}>Save</button>
          </div>
          <div className="cancel">
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forms;
