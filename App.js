import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import theme from './constants/theme.json';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer className="black">
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#007AFF', // Color for active tab
          inactiveTintColor: '#A7C7E7', // Color for inactive tab
          style: styles.tabBarStyle,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = 24; // Set the default icon size
        
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Login') {
              iconName = focused ? 'person' : 'person-outline';
            }
        
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Login" component={LoginTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function LoginTab() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <LoginScreen />
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF', // Background color of the tab bar
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Top border color of the tab bar
  },
});
