import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqmp6fXu_uT-PlGRtdCPdqHcHw0o7dKBc",
  authDomain: "pro-cutters-mechanic-app.firebaseapp.com",
  databaseURL: "https://pro-cutters-mechanic-app-default-rtdb.firebaseio.com",
  projectId: "pro-cutters-mechanic-app",
  storageBucket: "pro-cutters-mechanic-app.appspot.com",
  messagingSenderId: "700451622884",
  appId: "1:700451622884:web:d50fdc54a4e93ad40941f1",
  measurementId: "G-YW1VJP9CH0"
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
