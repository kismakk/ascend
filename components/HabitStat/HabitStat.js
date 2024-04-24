import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from '../../hooks/ThemeContext';
import getDynamicStyles from '../HabitModal/HabitModal.styles';
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';

const HabitStat = ({ data }) => {
  const { theme } = useTheme();
  const dynamicStyles = getDynamicStyles(theme);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [statisticFrame, setStatisticFrame] = useState(initialStatisticFrame);
  const [isLoading, setIsLoading] = useState(true)
  const [maxValue, setMaxValue] = useState(0);
  const IconColor = COLORS[theme].secondary;


  const initialStatisticFrame = [
    { value: 0, label: 'Mon' },
    { value: 0, label: 'Tue' },
    { value: 0, label: 'Wed' },
    { value: 0, label: 'Thu' },
    { value: 0, label: 'Fri' },
    { value: 0, label: 'Sat' },
    { value: 0, label: 'Sun' },
  ];

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(true);
      const updatedFrame = [...initialStatisticFrame];
      data.forEach(task => {
        const habitDate = new Date(task.date);
        if (isSameWeek(habitDate, currentWeek)) {
          const dayOfWeek = (habitDate.getDay() + 6) % 7;
          const points = calculatePoints(task);
          updatedFrame[dayOfWeek].value += points;
        }
      });
      setStatisticFrame(updatedFrame);
      updatedFrame.forEach((habit) => {
        if (habit.value < 0) {
          habit.frontColor = '#ff0000';
        }
      });
      const calculatedMaxValue = calculateMaxValue(updatedFrame);
      const calculatedMostNegativeValue = calculateMostNegativeValue(updatedFrame);
      if (calculatedMaxValue < calculatedMostNegativeValue * (-1)) {
        setMaxValue(calculatedMostNegativeValue * (-1));
      } else {
        setMaxValue(calculatedMaxValue);
      }
      setIsLoading(false);
    }
  }, [currentWeek]);

  const calculateMaxValue = (frame) => {
    let maxValue = 0;
    frame.forEach((habit) => {
      if (habit.value > maxValue) {
        maxValue = habit.value;
      }
    });
    if (maxValue === 0) {
      return 10;
    };
    return maxValue;
  };

  const calculateMostNegativeValue = (frame) => {
    let mostNegativeValue = 0;
    frame.forEach((habit) => {
      if (habit.value < mostNegativeValue) {
        mostNegativeValue = habit.value;
      }
    });
    if (mostNegativeValue === 0) {
      return -10;
    }
    return mostNegativeValue;
  };

  const isSameWeek = (dueDate, current) => {
    const habitDateWeek = new Date(dueDate);
    const currentWeek = new Date(current);
    habitDateWeek.setHours(0, 0, 0, 0);
    currentWeek.setHours(0, 0, 0, 0);
    habitDateWeek.setDate(habitDateWeek.getDate() - (habitDateWeek.getDay() + 6) % 7);
    currentWeek.setDate(currentWeek.getDate() - (currentWeek.getDay() + 6) % 7);
    if (habitDateWeek.getTime() === currentWeek.getTime()) {
      return true;
    };
  };

  const calculatePoints = (task) => {
    let points = parseInt(task.points);
    if (task.isBad) {
      points *= -1;
    }
    return points;
  };

  const handlePreviousWeek = () => {
    setIsLoading(true);
    setCurrentWeek(prevWeek => {
      const prevWeekDate = new Date(prevWeek);
      prevWeekDate.setDate(prevWeek.getDate() - 7);
      return prevWeekDate;
    });
  };

  const handleNextWeek = () => {
    setIsLoading(true);
    setCurrentWeek(nextWeek => {
      const nextWeekDate = new Date(nextWeek);
      nextWeekDate.setDate(nextWeek.getDate() + 7);
      return nextWeekDate;
    });
  };

  const getWeekNumber = (date) => {
    const targetDate = new Date(date);
    targetDate.setDate(date.getDate() + 1 - (date.getDay() || 7));
    const yearStart = new Date(targetDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((targetDate - yearStart) / 86400000) + 1) / 7);
    return weekNumber;
  };

  return (
    <View>
      <Text style={[dynamicStyles.text, { paddingLeft: 32, paddingBottom: 10 }]}>Habits:</Text>
      <View style={dynamicStyles.habitStatisticButtons}>
        <AntDesign name="arrowleft" size={28} color={IconColor} onPress={handlePreviousWeek} />
        <Text style={dynamicStyles.text}>Week: {getWeekNumber(currentWeek)}</Text>
        <AntDesign name="arrowright" size={28} color={IconColor} onPress={handleNextWeek} />
      </View>
      {!isLoading && data.length > 0 ? (
        <BarChart
          data={statisticFrame}
          frontColor={'#0066CC'}
          width={320}
          height={120}
          maxValue={maxValue}
          autoShiftLabels
          noOfSections={4}
          noOfSectionsBelowXAxis={4}
          yAxisTextStyle={{ color: dynamicStyles.text.color }}
          xAxisLabelTextStyle={{ color: dynamicStyles.text.color }}
        />
      ) : (
        <BarChart
          frontColor={'#0066CC'}
          width={350}
          height={120}
          maxValue={10}
          data={0}
          autoShiftLabels
          mostNegativeValue={-10}
          noOfSections={4}
          yAxisTextStyle={{ color: dynamicStyles.text.color }}
          xAxisLabelTextStyle={{ color: dynamicStyles.text.color }}
        />
      )
      }
    </View>
  );
};

export default HabitStat;
