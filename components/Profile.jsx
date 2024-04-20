import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';


const Profile = ({ mock }) => {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const flipCard = (index) => {
    if (flippedIndex === index) {
      // Reset the flip state if the clicked card is already flipped
      setFlippedIndex(null);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      // Flip the clicked card
      setFlippedIndex(index);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {mock.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => flipCard(index)} activeOpacity={0.8}>
            <Animated.View style={[styles.cardContainer]}>
              <View style={styles.face}>
                <Text>{item.name}</Text>
                <Text>{item.emoji}</Text>
                <Text>{item.image}</Text>
                {/* Assuming item.image is a valid image source */}
                {/* <Image source={} style={{ width: 100, height: 100 }} /> */}
              </View>
              <View style={[styles.back, flippedIndex === index ? styles.visible : styles.hidden]}>
                <Text style={{ color: 'black' }}>LOL</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
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
    height: 160,
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
    shadowRadius: 2,
    // Shadows for Android
    elevation: 5,
  },
  face: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    height: '100%',
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
});

export default Profile;