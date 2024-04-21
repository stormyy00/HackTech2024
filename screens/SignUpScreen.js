import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Input, Button, Card } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';
import { auth, createUserWithEmailAndPassword } from '../config/FirebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentUser } = useContext(AuthContext);

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      setCurrentUser(userCredential.user); // Update current user state context
  
      // Access Firestore
      const db = getFirestore();
  
      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date(),
        groups: [],
        userMoods: [],
        profilePicture: 'misc/emptyprofile.png'
      });
  
      console.log("User profile created in Firestore.");
    } catch (error) {
      console.error("Failed to create account or user profile:", error.message);
      setError("Failed to create account. " + error.message);
    }
  };
  

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Card style={styles.card}>
        <Text category='h1' style={styles.title}>Sign Up</Text>
        <Input 
        value = {firstName}
        label = 'First Name'
        placeholder = 'Enter your first name'
        onChangeText = {setFirstName}
        style = {styles.input}
        />
        <Input
        value = {lastName}
        label = 'Last Name'
        placeholder = 'Enter your last name'
        onChangeText = {setLastName}
        style = {styles.input}
        />
        <Input
        value={email}
        label='Email'
        placeholder='Enter your email'
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"  // Ensures that the input does not automatically capitalize
        keyboardType="email-address"  // Optionally set the keyboard type to email-address
        />

        <Input
          value={password}
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />
        <Input
          value={confirmPassword}
          label='Confirm Password'
          placeholder='Confirm your password'
          secureTextEntry
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {/* Display error message here */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button onPress={handleSignUp} style={styles.button}>
          SIGN UP
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
    color: 'red', // Error text color
    marginBottom: 10, // Space between the error message and the button
  },
});

export default SignUpScreen;
