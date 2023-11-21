import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const TruckList = () => {
    const [trucks, setTrucks] = useState([]);
  
    useEffect(() => {
      const fetchTrucks = async () => {
        // Access the "trucks" collection in Firestore
        const trucksCollection = collection(firestore, 'trucks');
  
        // Fetch documents from the "trucks" collection
        const trucksSnapshot = await getDocs(trucksCollection);
  
        // Extract data from documents and update state
        const truckData = trucksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setTrucks(truckData);
      };
  
      fetchTrucks();
    }, []);
  
    return (
      <div>
        <h1>Truck List</h1>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {trucks.map((truck) => (
            <li key={truck.id}>
              {`${truck.number} - Operational: ${truck.isOperational ? 'Yes' : 'No'}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TruckList;
