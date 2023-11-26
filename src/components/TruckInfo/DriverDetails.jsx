import React from 'react';

const DriverDetails = ({ driver }) => (
  <tr>
    <td>Driver:</td>
    <td>{driver.name}</td>
  </tr>
);

export default DriverDetails;
