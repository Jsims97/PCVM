import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import TruckList from '../Dashboard/TruckList';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [isSignedIn, setIsSignedIn] = useState(false);
        const navigate = useNavigate();


            const signIn = (e) => {
                e.preventDefault();
                signInWithEmailAndPassword(auth, email, password)
                  .then ((userCredential) => {
                  console.log(userCredential)
                  setIsSignedIn(true);
                })
                .catch((error) => {
                    console.log(error);
                }); 
            };
    return (
        <div className="sign-in-container">
        {isSignedIn ? (
          // If signed in, render the TruckList component
          <TruckList />
        ) : (
          // If not signed in, render the sign-in form
          <form onSubmit={signIn}>
            <h1>Log In</h1>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Log In</button>
          </form>
        )}
      </div>  
    );
};

export default SignIn
