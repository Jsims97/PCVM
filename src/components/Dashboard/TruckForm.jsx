import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase'; 

const AddTruckForm = ({ onAddTruck }) => {
    const [truckNumber, setTruckNumber] = useState('');
    const [isOperational, setIsOperational] = useState(true);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Add truck to database
      const trucksCollection = collection(firestore, 'trucks');
      const newTruck = {
        number: truckNumber,
        isOperational,
      };
  
      const docRef = await addDoc(trucksCollection, newTruck);
  
      // Clear form inputs
      setTruckNumber('');
      setIsOperational(true);
  
      // Trigger callback to update TruckList component
      onAddTruck(newTruck);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Truck Number:
          <input
            type="number"
            placeholder='#'
            value={truckNumber}
            onChange={(e) => setTruckNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Operational:
          <input
            type="checkbox"
            checked={isOperational}
            onChange={() => setIsOperational(!isOperational)}
          />
        </label>
        <button type="submit">Add Truck</button>
      </form>
    );
  };
  
  export default AddTruckForm;
