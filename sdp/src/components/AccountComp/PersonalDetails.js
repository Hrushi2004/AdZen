import React, { useEffect, useState } from 'react';

const PersonalDetails = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user-data'); // Replace with your server endpoint
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message || 'Unknown error');
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h2>Personal Details Page</h2>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default PersonalDetails;
