import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from './constants/theme.json';
import { AuthProvider, AuthContext } from './context/AuthContext';

import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import LoginScreen from './screens/LoginScreen';
import GroupScreen from './screens/GroupScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import AudioScreen from './screens/AudioScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  const requestUser = async () => {
    const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
  };
  return (
    <AuthProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

        <Navigation />
      </ApplicationProvider>
    </AuthProvider>
  );
}

function Navigation() {
  const { currentUser } = useContext(AuthContext);

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Camera':
                iconName = focused ? 'camera' : 'camera-outline';
                break;
              case 'Groups':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Audio':
                iconName = focused ? 'mic' : 'mic-outline';
                break;
              default:
                iconName = 'alert-circle-outline';
            }
            return <Icon name={iconName} fill={color} style={{ width: size, height: size }} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#A7C7E7',
          tabBarStyle: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Groups" component={GroupScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Audio" component={AudioScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {currentUser ? <MainTabs /> : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
