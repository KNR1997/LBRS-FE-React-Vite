import React, { useContext, useState } from 'react';
import './tourForm.css'; // Import your CSS file
import { BASE_URL } from '../../utils/config';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { getUserRecord } from '../../store/userRecordSlice';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

function TourForm() {
  const { user } = useContext(AuthContext);
  const userRecord = useSelector(getUserRecord);
  const initialFormValues = {
    destination: '',
    startDate: '',
    endDate: '',
    tourDays: '',
    budget: '',
    crew: '',
    tourDescription: '',
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {
      userRecordID: userRecord.id,
      ...formValues,
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/tour/saveOrUpdateTour`,
        postData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      showSuccessToast("Form Submitted");
      console.log('Form submission successful:', response.data);
    } catch (error) {
      showErrorToast(error.message);
      console.error('Error submitting form:', error.message);
    }
  };

  const handleClear = () => {
    setFormValues(initialFormValues);
  };

  return (
    <div className="tour-form tour-form-container">
      <h2>Tour Form</h2>
      <form className='tour-form' onSubmit={handleSubmit}>
        <label htmlFor="destination">Destination:</label>
        <input 
          type="text" 
          id="destination" 
          name="destination" 
          value={formValues.destination}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="startDate">Start Date:</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate"
          value={formValues.startDate}
          onChange={handleInputChange}
        />

        <label htmlFor="endDate">End Date:</label>
        <input 
          type="date" 
          id="endDate" 
          name="endDate" 
          value={formValues.endDate}
          onChange={handleInputChange}
        />

        {/* <label htmlFor="tourDays">Tour Days:</label>
        <input type="number" id="tourDays" name="tourDays" /> */}

        <label htmlFor="budget">Budget:</label>
        <input 
          type="number" 
          id="budget" 
          name="budget" 
          value={formValues.budget}
          onChange={handleInputChange}
        />

        <label htmlFor="crew">Crew Number:</label>
        <input 
          type="number" 
          id="crew" 
          name="crew" 
          value={formValues.crew}
          onChange={handleInputChange}
        />

        {/* <label htmlFor="tourDescription">Tour Description:</label>
        <textarea id="tourDescription" name="tourDescription"></textarea> */}

        <button type="submit">Submit</button>
        <button className='clear-btn' onClick={handleClear}>Clear</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default TourForm;
