import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import theme from './constants/theme.json';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider } from './context/AuthContext'; // Make sure the path is correct

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
    {/* <AuthProvider> */}
      <LoginScreen />
    {/* </AuthProvider> */}
  </ApplicationProvider>
);
