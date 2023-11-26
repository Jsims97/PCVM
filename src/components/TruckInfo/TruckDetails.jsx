import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { Card, ListGroup, Button } from 'react-bootstrap';
import AddDataForm from './AddDataForm';
import DriverDetails from './DriverDetails';
import MaintenanceDetails from './MaintenanceDetails';

const TruckDetails = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      try {
        const truckDocRef = doc(firestore, 'trucks', id);
        const truckDocSnapshot = await getDoc(truckDocRef);

        if (truckDocSnapshot.exists()) {
          const truckData = { id: truckDocSnapshot.id, ...truckDocSnapshot.data() };
          setTruck(truckData);

          // Fetch drivers for the truck
          const driversCollection = collection(firestore, 'drivers');
          const driversQuery = query(driversCollection, where('truckId', '==', id));
          const driversSnapshot = await getDocs(driversQuery);
          const driverData = driversSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setDrivers(driverData);

          // Fetch scheduled maintenance for the truck
          const maintenanceCollection = collection(firestore, 'maintenance');
          const maintenanceQuery = query(maintenanceCollection, where('truckId', '==', id));
          const maintenanceSnapshot = await getDocs(maintenanceQuery);
          const maintenanceData = maintenanceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setMaintenance(maintenanceData);
        } else {
          console.error('Truck not found.');
        }
      } catch (error) {
        console.error('Error fetching truck details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTruckDetails();
  }, [id]);

  const handleDataAdded = () => {
    // You might want to refresh the truck details after adding data
    // You can add logic here to refetch the truck details or update the local state
    console.log('Data added!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!truck) {
    return <p>Truck not found.</p>;
  }

  return (
    <div>
      <Link to="/Dashboard/truckList">
        <Button> Back</Button>
      </Link>
      <Card>
        <Card.Header>
          <Card.Title>Truck Details</Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Truck Number:</strong> {truck.number}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Operational Status:</strong> {truck.isOperational ? 'Yes' : 'No'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Driver:</strong> {drivers.name}
          </ListGroup.Item>
          {maintenance.map((item) => (
            <ListGroup.Item key={item.id}>
              <strong>Scheduled Maintenance:</strong> {item.description} - {item.date}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body>
          <AddDataForm truckId={id} onDataAdded={handleDataAdded} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default TruckDetails;