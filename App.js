import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconRegistry, Icon, ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from './constants/theme.json';
import { AuthProvider } from './context/AuthContext';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import GroupScreen from './screens/GroupScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserProfile from "./screens/UserProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
                  case 'Camera': iconName = focused ? 'camera' : 'camera-outline'; break;
                  case 'Login': iconName = focused ? 'person' : 'person-outline'; break;
                  case 'Groups': iconName = focused ? 'people' : 'people-outline'; break;
                  case 'Sign Up': iconName = focused ? 'person-add' : 'person-add-outline'; break;
                  case 'Profile': iconName = focused ? 'person' : 'person-outline'; break; // Adjusted for consistency
                  default: iconName = 'alert-circle-outline';
                }
                return <Icon name={iconName} fill={color} style={{ width: size, height: size }} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#007AFF',
              inactiveTintColor: '#A7C7E7',
              style: styles.tabBarStyle,
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Groups" component={GroupScreen} />
            <Tab.Screen name="Sign Up" component={SignUpScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen
              name="User"
              component={UserProfile}
              options={{ tabBarVisible: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
