import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { useTheme } from '../../hooks/ThemeContext';
import getDynamicStyles from '../HabitModal/HabitModal.styles';

const HabitStat = () => {
  
  const { theme } = useTheme();
  const dynamicStyles = getDynamicStyles(theme);

  const data = [
      {value: -10, label: 'Mon'},
      {value: 3, label: 'Tue'},
      {value: 10, label: 'Wed'},
      {value: -5, label: 'Thu'},
      {value: 20, label: 'Fri'},
      {value: 5, label: 'Sat'},
      {value: -12, label: 'Sun'},
    ];

    data.forEach((item) => {
      if(item.value < 0) {
        item.frontColor = '#ff0000'
      }
    })
    

  let barHeight = 0;
  data.forEach((data) => {
    if(data.value > barHeight) {
      barHeight = data.value;
    };
  });
  let minusHeight = barHeight * (-1);

  return (
    <View>
        <Text style={[dynamicStyles.text, {paddingLeft: 32, paddingBottom: 10}]}>Habits</Text>
        <BarChart 
        frontColor={'#0066CC'}
        width={350}
        height={120}
        noOfSections={4}
        maxValue={barHeight} 
        data={data}
        isAnimated
        autoShiftLabels 
        mostNegativeValue={minusHeight}
        yAxisTextStyle={{color: dynamicStyles.text.color}}
        xAxisLabelTextStyle={{color: dynamicStyles.text.color}}
        />
    </View>
  );
};

export default HabitStat;
