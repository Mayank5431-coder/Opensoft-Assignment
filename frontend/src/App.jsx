import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupOtp from './auth/SignupOtp';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './auth/Dashboard';
import NotFound from './auth/Not Found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />}>
        </Route>
        <Route path='/signup/otp' element={<SignupOtp />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;