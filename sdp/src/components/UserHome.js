// UserHome.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserHome() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user-specific data using the userId
    // Example API call: fetchUserData(userId)
    // Update the userData state with fetched data
  }, [userId]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.username}!</h2>
          {/* Display user-specific content */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserHome;
