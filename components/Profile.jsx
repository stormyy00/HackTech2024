import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';

const Profile = ({ mock }) => {
  const [flipped, setFlipped] = useState(Array(mock.length).fill(false));

  const flipCard = (index) => {
    setFlipped((prevFlipped) => {
      const newFlipped = [...prevFlipped];
      newFlipped[index] = !prevFlipped[index];
      return newFlipped;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {mock.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => flipCard(index)} activeOpacity={0.8}>
            <Animated.View className=""style={styles.cardContainer}>
              <View style={styles.face}>
                <Text>{item.name}</Text>
                <Text>{item.emoji}</Text>
                <Text>{item.image}</Text>
              </View>
              <View style={[styles.back, flipped[index] ? styles.visible : styles.hidden]}>
                <Text className="text-black">LOL</Text>
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
    transform: [{ rotateY: '180deg' }],
  },
  visible: {
    transform: [{ rotateY: '0deg' }],
  },
  hidden: {
    transform: [{ rotateY: '180deg' }],
  },
});

export default Profile;
