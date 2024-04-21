import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as Notifications from 'expo-notifications';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(); // Assuming you have initialized Firebase elsewhere

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed: ", user);
      setCurrentUser(user);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function getNotificationPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('You need to enable notifications for this app to work.');
      }
    }

    getNotificationPermission();
  }, []);
  

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
