import React, { useState } from 'react';
import AddDriverForm from './AddDriverForm'; // Import your existing AddDriverForm
import AddMaintenanceForm from './AddMaintenanceForm'; // Import a hypothetical AddMaintenanceForm

const AddDataForm = ({ truckId, onDataAdded }) => {
  const [dataType, setDataType] = useState(null);

  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const handleDataAdded = () => {
    // Notify the parent component (TruckDetails) that data has been added
    onDataAdded();
    // Reset data type after adding to allow for selecting a new type
    setDataType(null);
  };

  // Render the form based on the selected data type
  const renderForm = () => {
    switch (dataType) {
      case 'driver':
        return <AddDriverForm truckId={truckId} onAddDriver={handleDataAdded} />;
      case 'maintenance':
        // Replace this with the actual form for adding maintenance data
        return <AddMaintenanceForm truckId={truckId} onAddMaintenance={handleDataAdded} />;
      // Add more cases for additional data types
      default:
        return null;
    }
  };

  return (
    <div>
      <label>
        Select Data Type:
        <select value={dataType} onChange={handleDataTypeChange}>
          <option value="" disabled>Select...</option>
          <option value="driver">Driver</option>
          <option value="maintenance">Scheduled Maintenance</option>
          {/* Add more options for additional data types */}
        </select>
      </label>
      {dataType && renderForm()}
    </div>
  );
};

export default AddDataForm;