import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import TruckList from './components/Dashboard/TruckList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="src\components\auth\SignIn.jsx" component={SignIn} />
          <Route path="src\components\auth\SignUp.jsx" component={SignUp} />
          <Route path="src\components\AuthDetails.jsx" component={AuthDetails} />
          <Route path="src\components\Dashboard\TruckList.jsx" component={TruckList} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
