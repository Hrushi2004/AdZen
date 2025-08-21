// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Aboutus from './components/Aboutus';
import Signup from './components/Signup';
import Signin from './components/Signin';
import UserContent from './components/UserContent';
import AccountInfo from './components/AccountInfo';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user-content" element={<UserContent />} />
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/account/*" element={<AccountInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
