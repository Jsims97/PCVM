import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase';

const AddDriverForm = ({ truckId, onAddDriver }) => {
  const [driverName, setDriverName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add driver to the database
    const driversCollection = collection(firestore, 'drivers');
    const newDriver = {
      name: driverName,
      truckId: truckId,
    };

    await addDoc(driversCollection, newDriver);

    // Clear form inputs
    setDriverName('');

    // Notify the parent component (AddDataForm) that a driver has been added
    onAddDriver();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Driver Name:
        <input
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Driver</button>
    </form>
  );
};

export default AddDriverForm;