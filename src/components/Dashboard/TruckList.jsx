import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
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
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card>
          <Card.Header>
            <Card.Title>Truck List</Card.Title>
          </Card.Header>
          <Card.Body>
            <div style={{ overflowX: 'auto' }}>
              <Table striped bordered hover responsive>
                <colgroup>
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
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
                      <td>
                        <Link to={`/truck/${truck.id}`}>
                          {truck.number}
                        </Link>
                      </td>
                      <td className={truck.isOperational ? 'operational-status-yes' : 'operational-status-no'}>
                        {truck.isOperational ? 'Yes' : 'No'}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleToggleOperational(truck.id, !truck.isOperational)}
                        >
                          Operational
                        </Button>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleRemoveTruck(truck.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
          <Card.Footer>
            <AddTruckForm onAddTruck={handleAddTruck} />
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default TruckList;
