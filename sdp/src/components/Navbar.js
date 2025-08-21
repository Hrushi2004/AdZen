import React from 'react';
import { Link } from 'react-router-dom';
import { Info, PersonAdd, Person } from '@mui/icons-material';
import './Navbar.css';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logoo">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1 className="logo-title">AdZen</h1>
      </div>

      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            <PersonAdd /> Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link">
            <Person /> Signin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/aboutus" className="nav-link">
            <Info /> About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
