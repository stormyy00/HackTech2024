import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';

const UploadStats = ({ navigation }) => {  // Assuming navigation prop is passed
  const moodData = [
    { mood: 'Happy', count: 90 },
    { mood: 'Sad', count: 5 },
    { mood: 'Energetic', count: 70 },
    { mood: 'Calm', count: 1 },
    { mood: 'Anxious', count: 60 },
    { mood: 'Angry', count: 0 },
    { mood: 'Hopeful', count: 99 },
    { mood: 'Tired', count: 80 },
    { mood: 'Bored', count: 0 },
    { mood: 'Excited', count: 45 },
    { mood: 'Nervous', count: 55 },
    { mood: 'Relaxed', count: 15 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Stats Overview</Text>
      <View style={styles.gridContainer}>
        {moodData.map((data, index) => (
          <View key={index} style={styles.gridItem}>
            <CircularProgress
              percentage={(data.count / 100 * 100).toFixed(1)}
              radius={40}
              strokeWidth={5}
              color={getColor(index)}
              donutColor={getColor(index)}
              children={
                <View style={styles.progressInner}>
                  <Text style={styles.progressText}>{`${data.count}%`}</Text>
                </View>
              }
            />
            <Text style={styles.moodLabel}>{data.mood}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const getColor = (index) => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB', '#FF6384', '#FF9F40', '#9966FF'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '30%', // Each grid item takes up a third of the container width
    margin: 10,
    alignItems: 'center',
  },
  progressInner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  moodLabel: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  }
});

export default UploadStats;
