import React from 'react';

const MaintenanceDetails = ({ maintenance }) => (
  <tr>
    <td>Maintenance:</td>
    <td>{maintenance.description}</td>
    {/* Add more maintenance details as needed */}
  </tr>
);

export default MaintenanceDetails;