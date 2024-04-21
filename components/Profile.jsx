import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image, Modal, TouchableWithoutFeedback } from 'react-native';

  
  const Profile = ({ mock }) => {
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    const [prevFlippedIndex, setPrevFlippedIndex] = useState(null);
    const [expandedImage, setExpandedImage] = useState(null);

    const flipCard = (index) => {
      if (flippedIndex === index) {
        // Reset the flip state if the clicked card is already flipped
        setFlippedIndex(null);
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        // Flip the clicked card
        setPrevFlippedIndex(flippedIndex); // Save the index of the previously flipped card
        setFlippedIndex(index);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }
    };
    const openExpandedImage = (image) => {
      setExpandedImage(image);
    };
  
    const closeExpandedImage = () => {
      setExpandedImage(null);
    };

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {mock.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => flipCard(index)} activeOpacity={0.8}>
              <Animated.View style={[styles.cardContainer]} className="">
              <View style={styles.face} className="align-middle mt-14 space-y-3" >
                <View style={styles.userProfile}>
                  <Image source={require('../assets/swag.png')} style={styles.profilePicture} className="ml-1.5 rounded-full" />
                </View>
                <View style={styles.userInfo} className="space-y-1 mr-2">
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                </View>
              </View>
                <View style={[styles.back, flippedIndex === index ? styles.visible : styles.hidden]}>
                  {/* <Text style={{ color: 'black' }}>LOL</Text> */}
                  <Image source={item.image} 
                  resizeMode="cover"
                  
                  style={{ width: 150, height: 250 }} />
                  <TouchableOpacity
                  title="" 
                  onPressOut={() => openExpandedImage(item.image)} style={[styles.expandIconContainer]}
                  >
                {/* Add your icon here, e.g., a magnifying glass icon */}
                <Text>🔍</Text>
              </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
        <Modal visible={expandedImage !== null} transparent className="">
        <TouchableWithoutFeedback onPress={closeExpandedImage}>
          <View style={styles.modalBackground}>
            <Image source={expandedImage} resizeMode="contain" className="w-11/12 h-full"/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      width: 160,
      height: 260,
      margin: 12,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: 'black',
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      // Shadows for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,
    },
    face: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    userProfile: {
      marginRight: 10, // Adjust as needed
    },
    profilePicture: {
      width: 100, // Adjust the size of the profile picture as needed
      height: 100,
      borderRadius: 50, // To make it circular
    },
    userInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18, // Adjust the font size as needed
      fontWeight: 'bold', // Adjust the font weight as needed
    },
    emoji: {
      fontSize: 16, // Adjust the font size as needed
    },
    back: {
      position: 'absolute',
      backfaceVisibility: 'hidden',
      borderRadius: 8,
      padding: 10,
      width: '90%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotateY: '0deg' }],
    },
    visible: {
      transform: [{ rotateY: '0deg' }],
    },
    hidden: {
      transform: [{ rotateY: '180deg' }],
    },
    expandIconContainer: {
      position: 'absolute',
      zIndex:2,
      top: -4,
      right: -1,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: 8,
      borderRadius: 20,
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'rgba(100, 2, 205, 0.2)',
    },
    expandedImage: {
      width: '90%',
      height: '100%',
    },
  });

  
  export default Profile;