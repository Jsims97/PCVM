import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

const TruckDetails = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      try {
        const truckDocRef = doc(firestore, 'trucks', id);
        const truckDocSnapshot = await getDoc(truckDocRef);

        if (truckDocSnapshot.exists()) {
          const truckData = { id: truckDocSnapshot.id, ...truckDocSnapshot.data() };
          setTruck(truckData);
        } else {
          console.error('Truck not found.');
        }
      } catch (error) {
        console.error('Error fetching truck details:', error);
      }
    };

    fetchTruckDetails();
  }, [id]);

  if (!truck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to="/Dashboard/TruckList">
        <Button variant="primary">Back to Truck List</Button>
      </Link>

      <Card>
        <Card.Header>
          <Card.Title>Truck Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>Truck Number:</td>
                <td>{truck.number}</td>
              </tr>
              <tr>
                <td>Operational Status:</td>
                <td>{truck.isOperational ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Fuel Type:</td>
                <td>{truck.fuelType || 'N/A'}</td>
              </tr>
              <tr>
                <td>Make and Model:</td>
                <td>{truck.makeAndModel || 'N/A'}</td>
              </tr>
              <tr>
                <td>VIN Number:</td>
                <td>{truck.vinNumber || 'N/A'}</td>
              </tr>
              <tr>
                <td>Tag:</td>
                <td>{truck.tag || 'N/A'}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{truck.location || 'N/A'}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{truck.description || 'N/A'}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>{truck.year || 'N/A'}</td>
              </tr>
              <tr>
                <td>Date Acquired:</td>
                <td>{truck.dateAcquired || 'N/A'}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TruckDetails;