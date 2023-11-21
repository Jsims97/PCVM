import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="src\components\auth\SignIn.jsx">Sign In</Link>
        </li>
        <li>
          <Link to="src\components\auth\SignUp.jsx">Sign Up</Link>
        </li>
        <li>
          <Link to="src\components\AuthDetails.jsx">Auth Details</Link>
        </li>
        <li>
          <Link to="src\components\Dashboard\TruckList.jsx">Truck List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;