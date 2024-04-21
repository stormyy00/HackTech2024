import React from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import UploadStats from '../components/PostUploadStats';  // Ensure the correct import path

export default function UserProfileScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UploadStats />
      <Button
        title="Return to Main Screen"
        onPress={() => navigation.goBack()}  // Navigate back or to a specific screen
        color="#007AFF"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  // Ensures that the container can grow to accommodate the contents
    justifyContent: 'center',  // Center contents vertically in the container
    alignItems: 'center',  // Center contents horizontally in the container
    backgroundColor: '#FBAB7E',  // Background color
    padding: 20  // Padding around the content
  },
  returnButton: {
    marginTop: 20,  // Space above the button
    width: '80%',  // Width of the button
    alignSelf: 'center'  // Center the button horizontally
  }
});
