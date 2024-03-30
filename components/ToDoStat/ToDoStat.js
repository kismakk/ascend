
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

const ToDoStat = () => {

  const data = [
    {
      stacks: [
        {value: 10, color: '#4bb050', marginBottom: 2},
        {value: 0, color: '#eba504', marginBottom: 2},
        {value: 0, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Mon'
    },
    {
      stacks: [
        {value: 1, color: '#4bb050', marginBottom: 2},
        {value: 2, color: '#eba504', marginBottom: 2},
        {value: 3, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Tue'
    },
    {
      stacks: [
        {value: 6, color: '#4bb050', marginBottom: 2},
        {value: 0, color: '#eba504', marginBottom: 2},
        {value: 6, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Wed'
    },
    {
      stacks: [
        {value: 0, color: '#4bb050', marginBottom: 2},
        {value: 4, color: '#eba504', marginBottom: 2},
        {value: 6, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Thu'
    },
    {
      stacks: [
        {value: 6, color: '#4bb050', marginBottom: 2},
        {value: 0, color: '#eba504', marginBottom: 2},
        {value: 6, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Fri'
    },
    {
      stacks: [
        {value: 4, color: '#4bb050', marginBottom: 2},
        {value: 0, color: '#eba504', marginBottom: 2},
        {value: 0, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Sat'
    },
    {
      stacks: [
        {value: 0, color: '#4bb050', marginBottom: 2},
        {value: 8, color: '#eba504', marginBottom: 2},
        {value: 0, color: '#c23f3f', marginBottom: 2},
      ],
      label: 'Sun'
    },  
  ];

  return (
    <View>
      <Text style={{paddingLeft: 32, paddingBottom: 10}}>ToDo's</Text>
      <BarChart 
      width={350}
      noOfSections={4}
      stackData={data}
      xAxisThickness={1}
      isAnimated
      />
    </View>
  );
};

export default ToDoStat;
