import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ imageUrl }) => {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/splash.png')} style={styles.image} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: 100, // Adjust size as needed
      height: 100, // Adjust size as needed
      borderRadius: 50, // Half of width or height to make it circular
      overflow: 'hidden', // Clip the image to the circular border
      borderWidth: 2, // Border width
      borderColor: 'white', // Border color
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
  
  export default ProfilePicture;