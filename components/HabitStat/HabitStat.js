
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

const HabitStat = () => {

    const data = [
        {value: -10, label: 'Mon'},
        {value: 3, label: 'Tue'},
        {value: 10, label: 'Wed'},
        {value: -5, label: 'Thu'},
        {value: 20, label: 'Fri'},
        {value: 5, label: 'Sat'},
        {value: -12, label: 'Sun'},
      ];

  let barHeight = 0;
  data.forEach((data) => {
    if(data.value > barHeight) {
      barHeight = data.value;
    };
  });
  let minusHeight = barHeight * (-1);

  return (
    <View>
        <Text style={{paddingLeft: 32, paddingBottom: 10}}>Habits</Text>
        <BarChart 
        frontColor={'#0066CC'}
        width={350}
        height={120}
        noOfSections={4}
        maxValue={barHeight} 
        data={data}
        xAxisThickness={1} 
        isAnimated
        autoShiftLabels 
        mostNegativeValue={minusHeight}
        />
    </View>
  );
};

export default HabitStat;
