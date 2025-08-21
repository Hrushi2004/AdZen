import React from 'react';
import './Aboutus.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Aboutus() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        
        <h2>About Us</h2>
        <p>
          AdZen is a leading digital advertising platform dedicated to simplifying the complexities of online ad campaigns. Our mission is to empower businesses of all sizes to effectively plan, launch, and optimize their advertising strategies with ease and precision.
        </p>
        {/* Rest of your content */}
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    </div>
  );
}

export default Aboutus;
