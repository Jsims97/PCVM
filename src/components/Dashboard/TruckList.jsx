import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../../firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc   } from 'firebase/firestore';
import AddTruckForm from './TruckForm';

const TruckList = () => {
    const [trucks, setTrucks] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

  
    useEffect(() => {
      const fetchTrucks = async () => {
        const trucksCollection = collection(firestore, 'trucks');
        const trucksSnapshot = await getDocs(trucksCollection);
        const truckData = trucksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrucks(truckData);
      };

          // Fetch trucks only if data hasn't been loaded yet
    
      fetchTrucks();
  }, [trucks]);
  
    const handleAddTruck = async (newTruck) => {
      // Check if the truck is already in the list
      if (!trucks.some((truck) => truck.number === newTruck.number)) {
        // Add the new truck to the Firestore collection
        const trucksCollection = collection(firestore, 'trucks');
        await addDoc(trucksCollection, newTruck);
  
        // Update the state with the new truck
        setTrucks((prevTrucks) => [...prevTrucks, newTruck]);
      } else {
        // Truck with the same number already exists
        console.log('Truck with this number already exists.');
      }
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
