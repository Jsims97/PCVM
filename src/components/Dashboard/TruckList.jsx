import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { auth, firestore } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddTruckForm from './TruckForm';
import { Link } from 'react-router-dom';


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

    fetchTrucks();
  }, [trucks]);

  const handleAddTruck = async (newTruck) => {
    if (!trucks.some((truck) => truck.number === newTruck.number)) {
      const trucksCollection = collection(firestore, 'trucks');
      await addDoc(trucksCollection, newTruck);
      setTrucks((prevTrucks) => [...prevTrucks, newTruck]);
    } else {
      console.log('Truck with this number already exists.');
    }
  };

  const handleRemoveTruck = async (truckId) => {
    setTrucks((prevTrucks) => prevTrucks.filter((truck) => truck.id !== truckId));
    const trucksCollection = collection(firestore, 'trucks');
    await deleteDoc(doc(trucksCollection, truckId));
  };

  const handleToggleOperational = async (truckId, newOperationalStatus) => {
    setTrucks((prevTrucks) =>
      prevTrucks.map((truck) =>
        truck.id === truckId ? { ...truck, isOperational: newOperationalStatus } : truck
      )
    );

    const trucksCollection = collection(firestore, 'trucks');
    const truckDoc = doc(trucksCollection, truckId);
    await updateDoc(truckDoc, { isOperational: newOperationalStatus });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Truck List</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Truck Number</th>
              <th>Operational Status</th>
              <th>Toggle Operational</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => (
              <tr key={truck.id}>
                <td>{truck.number}</td>
                <td className={truck.isOperational ? 'operational-status-yes' : 'operational-status-no'}>
                  {truck.isOperational ? 'Yes' : 'No'}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleToggleOperational(truck.id, !truck.isOperational)}
                  >
                    Toggle Operational
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveTruck(truck.id)}>
                    Remove
                  </Button>
                </td>
                <td>
                  <Link to={`/truck/${truck.id}`}>
                    <Button variant="info">View Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddTruckForm onAddTruck={handleAddTruck} />
      </Card.Body>
    </Card>
  );
};

export default TruckList;
