import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc   } from 'firebase/firestore';
import AddTruckForm from './TruckForm';

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

    const handleAddTruck = async (newTruck) => {
      // Update the state with the new truck
      setTrucks((prevTrucks) => [...prevTrucks, newTruck]);
  
      // Add the new truck to the Firestore collection
      const trucksCollection = collection(firestore, 'trucks');
      await addDoc(trucksCollection, newTruck);
    };

    const handleRemoveTruck = async (truckId) => {
      setTrucks((prevTrucks) => prevTrucks.filter((truck) => truck.id !== truckId));
  
      const trucksCollection = collection(firestore, 'trucks');
      await deleteDoc(doc(trucksCollection, truckId));
    };

    const handleToggleOperational = async (truckId, newOperationalStatus) => {
      // Update the truck's operational status in the UI
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) =>
          truck.id === truckId ? { ...truck, isOperational: newOperationalStatus } : truck
        )
      );
    
      // Update the truck's operational status in the Firestore collection
      const trucksCollection = collection(firestore, 'trucks');
      const truckDoc = doc(trucksCollection, truckId);
      await updateDoc(truckDoc, { isOperational: newOperationalStatus });
    };
  
    return (
      <div>
        <h1>Truck List</h1>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {trucks.map((truck) => (
            <li key={truck.id}>
              {`${truck.number} - Operational: ${truck.isOperational ? 'Yes' : 'No'}`}
              <button onClick={() => handleToggleOperational(truck.id, !truck.isOperational)}>
                Toggle Operational
              </button>
              <button onClick={() => handleRemoveTruck(truck.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <AddTruckForm onAddTruck={handleAddTruck}/> 
      </div>
    );
  };
  
  export default TruckList;
