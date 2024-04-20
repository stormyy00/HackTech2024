import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress'; // Assuming CircularProgress is the correct component

const Stats = () => {
  const mockMoodData = [
    { mood: 'happy', count: 80 },
    { mood: 'chilling', count: 50 },
    { mood: 'ndndd', count: 30 }
  ];
  
  const moodData = [
    { timestamp: new Date('2024-04-19'), mood: 'happy', count: 60 },
    { timestamp: new Date('2024-04-19'), mood: 'chilling', count: 40 },
    { timestamp: new Date('2024-04-19'), mood: 'ndndd', count: 20 },
    { timestamp: new Date('2024-04-18'), mood: 'happy', count: 50 },
    { timestamp: new Date('2024-04-18'), mood: 'chilling', count: 30 },
    { timestamp: new Date('2024-04-18'), mood: 'ndndd', count: 10 },
    { timestamp: new Date('2024-04-17'), mood: 'happy', count: 70 },
    { timestamp: new Date('2024-04-17'), mood: 'chilling', count: 60 },
    { timestamp: new Date('2024-04-17'), mood: 'ndndd', count: 40 }
  ];
  const calculateOverallMoodStats = () => {
    const last3DaysData = moodData.slice(0, 3); // Assuming moodData is an array of mood data with timestamps
    const overallStats = {
      happy: 0,
      chilling: 0,
      ndndd: 0,
    };

    last3DaysData.forEach(data => {
      overallStats[data.mood] += data.count;
    });

    const totalCount = Object.values(overallStats).reduce((acc, val) => acc + val, 0);
    const overallStatsWithPercentage = Object.keys(overallStats).map(mood => ({
      mood,
      count: overallStats[mood],
      percentage: totalCount ? ((overallStats[mood] / totalCount) * 100).toFixed(2) : 0,
    }));

    return overallStatsWithPercentage;
  };

  const overallMoodStats = calculateOverallMoodStats();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Mood Stats (Last 3 Days)</Text>
      <View style={styles.statRow} className="space-x-4 mt-4">
        {overallMoodStats.map(stat => (
          <View style={styles.column} key={stat.mood}>
            <CircularProgress
              percentage={parseFloat(stat.percentage)}
              radius={20} // Adjust this as per your requirement
              strokeWidth={3} // Adjust this as per your requirement
              color="#FBAB7E" // Adjust this as per your requirement
              donutColor="#FBAB7E"
            />
            <Text className="font-bold mt-2">{stat.percentage}{"%"}</Text>
            <Text style={[styles.mood, styles.blackText]} className="font-semibold">{stat.mood}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 6,
    marginVertical: 2,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mood: {
    fontSize: 16,
    marginTop: 5,
  },
  count: {
    fontSize: 16,
    marginTop: 5,
  },
  percentage: {
    fontSize: 16,
    marginTop: 5,
  },
  blackText: {
    color: 'black',
  },
});

export default Stats;