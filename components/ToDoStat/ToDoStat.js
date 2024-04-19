import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from '../../hooks/ThemeContext';
import getDynamicStyles from '../ToDoModal/ToDoModal.styles';

const ToDoStat = ({ data }) => {
  const { theme } = useTheme();
  const dynamicStyles = getDynamicStyles(theme);
  const [statisticFrame, setStatisticFrame] = useState('');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)

  const initialStatisticFrame = [
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Mon' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Tue' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Wed' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Thu' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Fri' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Sat' },
    { stacks: [{ value: 0, color: '#4bb050', marginBottom: 2 }, { value: 0, color: '#eba504', marginBottom: 2 }, { value: 0, color: '#c23f3f', marginBottom: 2 }], label: 'Sun' },
  ];

  useEffect(() => {
    const updatedFrame = [...initialStatisticFrame];
    data.forEach(task => {
      if(task.isDone) {
        const dueDate = new Date(task.doneDate);
        if (isSameWeek(dueDate, currentWeek)) {
          const dayOfWeek = (dueDate.getDay() + 6) % 7;
          const difficultyIndex = ['EASY', 'MEDIUM', 'HARD'].indexOf(task.difficulty);
          updatedFrame[dayOfWeek].stacks[difficultyIndex].value += calculatePoints(task.difficulty);
        }
      }
    });
    setStatisticFrame(updatedFrame);
    setIsLoading(false)
  }, [data, currentWeek]);

  const isSameWeek = (dueDate, current) => {
    const dueDateWeek = new Date(dueDate);
    const currentWeek = new Date(current);
    dueDateWeek.setHours(0, 0, 0, 0);
    currentWeek.setHours(0, 0, 0, 0);
    dueDateWeek.setDate(dueDateWeek.getDate() - (dueDateWeek.getDay() + 6) % 7); 
    currentWeek.setDate(currentWeek.getDate() - (currentWeek.getDay() + 6) % 7); 
    if(dueDateWeek.getTime() === currentWeek.getTime()) {
      return true;
    };
  };

  const calculatePoints = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 1;
      case 'MEDIUM':
        return 3;
      case 'HARD':
        return 5;
      default:
        return 0;
    }
  };

  const handlePreviousWeek = () => {
    setIsLoading(true)
    setCurrentWeek(prevWeek => {
      const prevWeekDate = new Date(prevWeek);
      prevWeekDate.setDate(prevWeek.getDate() - 7);
      return prevWeekDate;
    });
  };

  const handleNextWeek = () => {
    setIsLoading(true)
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
      <Text style={[dynamicStyles.text, { paddingLeft: 32, paddingBottom: 10 }]}>ToDo's</Text>
      <View style={dynamicStyles.todoStatisticButtons}>
        <Button title="<" onPress={handlePreviousWeek} />
        <Text style={dynamicStyles.text}>Week: {getWeekNumber(currentWeek)}</Text>
        <Button title=">" onPress={handleNextWeek} />
      </View>
      
      <View style={dynamicStyles.text.color}>
        {!isLoading && 
          <BarChart
          width={350}
          noOfSections={4}
          stackData={statisticFrame}
          isAnimated
          yAxisTextStyle={{ color: dynamicStyles.text.color }}
          xAxisLabelTextStyle={{ color: dynamicStyles.text.color }}
        />
        }
      </View>
    </View>
  );
};

export default ToDoStat;
