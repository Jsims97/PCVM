import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import TruckList from '../Dashboard/TruckList';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="sign-in-header text-center mb-3 p-3 rounded">
        <h1>Pro Cutters: Mechanic Tools</h1>
      </div>
      {isSignedIn ? (
        // If signed in, render the TruckList component
        <TruckList />
      ) : (
        // If not signed in, render the sign-in form inside a centered card
        <Card className='sign-in-card'>
          <Card.Header className='sign-in-card-header'>
            <Card.Title>Log In</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={signIn}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SignIn;
