import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import TruckList from './components/Dashboard/TruckList';
import TruckDetails from './components/TruckInfo/TruckDetails';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="src/components/auth/SignIn" component={SignIn} />
          <Route path="src/components/auth/SignUp" component={SignUp} />
          <Route path="src/components/AuthDetails" component={AuthDetails} />
          <Route path="/dashboard/trucklist" element={<TruckList />} />
          <Route path="/truck/:id" element={<TruckDetails />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
