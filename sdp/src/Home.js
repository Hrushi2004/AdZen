// Home.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import YourImage from './hero.png';
import { Link } from 'react-router-dom';
import './App.css';
function Home() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <div className="text">
          <h1>Get Started</h1>
          <p>
            AdZen simplifies online ad campaigns. Say goodbye to complexity and manage ads effortlessly.
            Plan, launch, and optimize with ease.
          </p>
          <br></br>
          <button onClick={togglePopup}>Learn More</button>
        </div>

        <div className="right-image">
          <img src={YourImage} alt="Your Image" />
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-close" onClick={togglePopup}>
              <span>&times;</span>
            </div>
            <h2>Learn More</h2>
            <p>
              At AdZen, we empower your online advertising endeavors with simplicity and precision. Dive deeper into our platform to discover how we streamline ad campaign management across various platforms. Explore our user-friendly tools and gain control over your advertising strategies. Learn more about the AdZen advantage and elevate your online presence today.
            </p>
            <p>Are you interested?</p>
            <Link to="/signup" className="signup-button" onClick={togglePopup}>Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
