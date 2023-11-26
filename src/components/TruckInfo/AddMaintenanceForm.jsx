import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase';

const AddMaintenanceForm = ({ truckId, onAddMaintenance }) => {
  const [maintenanceDescription, setMaintenanceDescription] = useState('');
  const [maintenanceDate, setMaintenanceDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add scheduled maintenance to the database
    const maintenanceCollection = collection(firestore, 'maintenance');
    const newMaintenance = {
      description: maintenanceDescription,
      date: maintenanceDate,
      truckId: truckId,
    };

    await addDoc(maintenanceCollection, newMaintenance);

    // Clear form inputs
    setMaintenanceDescription('');
    setMaintenanceDate('');

    // Notify the parent component (AddDataForm) that maintenance has been added
    onAddMaintenance();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Maintenance Description:
        <input
          type="text"
          value={maintenanceDescription}
          onChange={(e) => setMaintenanceDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Maintenance Date:
        <input
          type="date"
          value={maintenanceDate}
          onChange={(e) => setMaintenanceDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Maintenance</button>
    </form>
  );
};

export default AddMaintenanceForm;