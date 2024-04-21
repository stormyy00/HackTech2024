import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const ProfilePicture = ({ imageUrl }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/china.jpg')} // Update with dynamic image source if available
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Elliot Cooper</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 110,
        backgroundColor: 'white',  // Semi-transparent black background for better readability
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 24,
        padding: 10  // Padding inside the container
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 55,  // Fully rounded
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        color: '#333333',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    metaData: {
        color: '#333333',
        fontSize: 16,
        marginBottom: 4,
    }
});

export default ProfilePicture;
