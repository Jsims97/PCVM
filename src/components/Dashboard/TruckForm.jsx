
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

    await addDoc(trucksCollection, newTruck);

    // Clear form inputs
    setTruckNumber('');
    setIsOperational(true);
  };

  return (
    <form className="add-truck-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <label style={{ marginRight: '10px' }}>
        Truck Number:
        <input
          type="number"
          placeholder="#"
          value={truckNumber}
          onChange={(e) => setTruckNumber(e.target.value)}
          required
        />
      </label>
      <label style={{ marginRight: '10px' }}>
        Operational:
        <input
          type="checkbox"
          checked={isOperational}
          onChange={() => setIsOperational(!isOperational)}
        />
      </label>
      <button className='add-truck-button' style={{ marginLeft: '10px', padding: '5px 10px' }} variant="primary" type="submit">
        Add Truck
      </button>
    </form>
  );
};


export default AddTruckForm;