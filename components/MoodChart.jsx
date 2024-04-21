import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from '@ui-kitten/components';

const screenWidth = Dimensions.get('window').width;
const maxContentWidth = screenWidth > 600 ? 600 : screenWidth;

const MoodChart = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('happy');
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [moodData, setMoodData] = useState([]);
  const [chartKey, setChartKey] = useState(Date.now());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    updateBarChart(currentWeekOffset, selectedEmotion);
  }, [currentWeekOffset, selectedEmotion]);

  const updateBarChart = (weekOffset, emotion) => {
    const data = generateWeekData(weekOffset, emotion);
    setMoodData(data);
    setChartKey(Date.now());
  };

  const generateWeekData = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        value: Math.random() * 10, // Random value for demo
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        frontColor: getEmotionColor(selectedEmotion),
      };
    }).reverse();
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: '#FF7E67',
      sad: '#517FF3',
      angry: '#FF6B6B',
    };
    return colors[emotion] || colors.happy;
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onEmotionChange = (item) => {
    if (item && item.value) {
      setSelectedEmotion(item.value);
      updateBarChart(selectedDate, item.value);
    }
  };

  const getWeekLabel = (offset) => {
    // Logic to determine the week label based on the currentWeekOffset
    // Replace with your actual week calculation
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() - 7 * offset);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    return `Week of ${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()} - ${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`;
  };

  const navigateWeeks = (offset) => {
    setCurrentWeekOffset(currentWeekOffset + offset);
  };

  return (
    <View style={styles.outerContainer}>
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedEmotion}
        items={[
          { label: 'Happy', value: 'happy' },
          { label: 'Sad', value: 'sad' },
          { label: 'Angry', value: 'angry' },
        ]}
        setOpen={setOpen}
        setValue={setSelectedEmotion}
        setItems={() => {}}
        onChangeValue={onEmotionChange}
        containerStyle={styles.dropdownContainerStyle}
        style={styles.dropdownPicker}
        dropDownContainerStyle={styles.dropdownDropDownStyle}
      />
      <View style={styles.weekNavigation}>
        <TouchableOpacity onPress={() => navigateWeeks(-1)} style={styles.navButton}>
          <Icon name="arrow-ios-back-outline" fill="#8F9BB3" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{getWeekLabel(currentWeekOffset)}</Text>
        <TouchableOpacity onPress={() => navigateWeeks(1)} style={styles.navButton}>
          <Icon name="arrow-ios-forward-outline" fill="#8F9BB3" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <BarChart
        key={chartKey}
        data={moodData}
        width={maxContentWidth - 82}
        height={220}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={styles.axisText}
        xAxisTextStyle={styles.axisText}
        barRadius={10}
        barWidth={20}
        noOfSections={5}
        sectionColor='#EAEAEA'
        backgroundColor='#FFF'
        frontColor='transparent'
      />
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  weekLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20, // Add horizontal space around the label
  },
  icon: {
    width: 24,
    height: 24,
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: maxContentWidth, // Use the max width defined above
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownContainerStyle: {
    width: maxContentWidth - 70, // Full width minus padding
    marginBottom: 20, // Space below the dropdown
    zIndex: 1000, // Ensure dropdown appears above other components
  },
  dropdownPicker: {
    backgroundColor: '#fafafa',
  },
  dropdownDropDownStyle: {
    backgroundColor: '#ffffff',
    zIndex: 1000, // Ensure dropdown options appear above other components
  },
  axisText: {
    color: '#A6A6A6',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginBottom: 20,
  },
  weekButton: {
    padding: 8,
  },
  weekButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  weekLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MoodChart;
