import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Text, Image } from 'react-native';
import { Input, Button, Card } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';
import { auth, signInWithEmailAndPassword } from '../config/FirebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setError('');
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setCurrentUser(userCredential.user); // Update current user state context
    } catch (error) {
      setError("Invalid username/password combination.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Card style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/MoodLogo.png')} style={styles.logo} />
        </View>
        <Input
  value={email}
  label='Email'
  placeholder='Enter your email'
  onChangeText={setEmail}
  style={styles.input}
  autoCapitalize="none"  
  keyboardType="email-address"
/>

        <Input value={password} label='Password' placeholder='Enter your password' secureTextEntry onChangeText={setPassword} style={styles.input} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button onPress={handleLogin} style={styles.button}>LOGIN</Button>
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
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'stretch',
  },
  logoContainer: {
    alignItems: 'center', // This will center the logo horizontally
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  }
});

export default LoginScreen;
