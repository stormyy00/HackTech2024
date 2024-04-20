import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const ProfilePicture = ({ imageUrl }) => {
    return (
      <View style={styles.container} className="flex flex-row gap-5 w-full mt-3 ml-14">
      <ImageBackground
        source={require('../assets/bitch.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer} className="border-0 gap-1 items-start p-5 ">
        <Text style={styles.heading}>Name</Text>
        <Text style={styles.metaData}>Howard Shoe</Text>
        <Text style={styles.heading}>Email</Text>
        <Text style={styles.metaData}>jackass@aol.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Row layout
    alignItems: 'center', // Center items vertically
    width: '100%', // Take full width of the parent
    height: 110, // Adjust height as needed
    borderWidth: 0,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24, // Adjust margin as needed
  },
  image: {
    width: 75, // Adjust width to make the image bigger
    height: '100%', // Take full height of the container
    overflow: 'hidden', // Hide overflow to clip the rounded corners
    borderRadius: 25, // Make the container rounded
    marginRight: 20, // Adjust margin between image and metadata
    transform: [{ scale: 2 }], // Zoom in by 25%
  },
  textContainer: {
    flex: 1, // Take remaining space in the container
    flexDirection: 'column', // Column layout
    justifyContent: 'center', // Center items vertically
    paddingHorizontal: 10, // Adjust padding as needed
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 5, // Adjust margin as needed
  },
    metaData: {
      // any styles for metadata
    },
  });
  export default ProfilePicture;