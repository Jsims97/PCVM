import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const AddTruckForm = ({ onAddTruck }) => {
  const [truckNumber, setTruckNumber] = useState('');
  const [isOperational, setIsOperational] = useState(true);
  const [fuelType, setFuelType] = useState('');
  const [makeAndModel, setMakeAndModel] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [tag, setTag] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [dateAcquired, setDateAcquired] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add truck to database
    const trucksCollection = collection(firestore, 'trucks');
    const newTruck = {
      number: truckNumber,
      isOperational,
      fuelType,
      makeAndModel,
      vinNumber,
      tag,
      location,
      description,
      year,
      dateAcquired,
    };

    await addDoc(trucksCollection, newTruck);

    // Clear form inputs
    setTruckNumber('');
    setIsOperational(true);
    setFuelType('');
    setMakeAndModel('');
    setVinNumber('');
    setTag('');
    setLocation('');
    setDescription('');
    setYear('');
    setDateAcquired('');

    // Notify the parent component that a truck has been added
    if (onAddTruck) {
      onAddTruck(newTruck);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add Truck</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Truck Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={truckNumber}
                  onChange={(e) => setTruckNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Gas or Diesel"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>VIN Number</Form.Label>
                <Form.Control
                  type="text"
                  value={vinNumber}
                  onChange={(e) => setVinNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Make and Model</Form.Label>
                <Form.Control
                  type="text"
                  value={makeAndModel}
                  onChange={(e) => setMakeAndModel(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date Acquired</Form.Label>
                <Form.Control
                  type="text"
                  value={dateAcquired}
                  onChange={(e) => setDateAcquired(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form>
                <Form.Check
                  type="checkbox"
                  label="Operational"
                  checked={isOperational}
                  onChange={() => setIsOperational(!isOperational)}
                />
              </Form>
          <Button variant="primary" type="submit">
            Add Truck
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddTruckForm;
