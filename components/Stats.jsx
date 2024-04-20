import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Stats = () => {
    return (
        <View style={styles.container} className="">
          <Text style={styles.title}>Overall Mood Stats</Text>
          {/* {overallMoodStats.map(stat => ( */}
            <View  style={styles.statRow} className=" w-full">
              <Text style={styles.mood}> || happy</Text>
              <Text style={styles.count}> || chilling</Text>
              <Text style={styles.percentage}> || ndndd</Text>
            </View>
        {/* //   ))} */}
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
      mood: {
        flex: 1,
        fontSize: 16,
      },
      count: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
      },
      percentage: {
        flex: 1,
        fontSize: 16,
        textAlign: 'right',
      },
    });

export default Stats
