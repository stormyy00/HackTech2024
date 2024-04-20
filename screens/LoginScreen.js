import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Input, Button, Card } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';
import { auth, signInWithEmailAndPassword } from '../config/FirebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store and display the error message
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    setError(''); // Clear any existing errors
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setCurrentUser(userCredential.user); // Update current user state context
    } catch (error) {
      let errorMessage = "Invalid username/password combination.";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No user found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format.";
      }
      setError(errorMessage); // Set the error message to display
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Card style={styles.card}>
        <Text category='h1' style={styles.title}>MOOD</Text>
        <Input
          value={email}
          label='Email'
          placeholder='Enter your email'
          onChangeText={setEmail}
          style={styles.input}
        />
        <Input
          value={password}
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
        {/* Display error message here */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button onPress={handleLogin} style={styles.button}>
          LOGIN
        </Button>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBAB7E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 500,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'AvenirNext-DemiBold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: 'red', // Make the error text red for visibility
    marginBottom: 10, // Space between the error message and the button
  },
});

export default LoginScreen;
