import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Define functions to update the user and handle sign-out if needed

  // Provide the user and functions to child components
  const contextValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to access the AuthContext
export function useAuthContext() {
  return useContext(AuthContext);
}
