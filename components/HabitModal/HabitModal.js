import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './HabitModal.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import useFirestore from '../../hooks/useFirestore';
import { COLLECTION } from '../../constants/collections';
import { DIFFICULTY } from '../../constants/difficulty';
import { POINTS } from '../../constants/points';

const HabitModal = ({ habitModalVisible, setHabitModalVisible }) => {
  const { addData } = useFirestore();

  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  const habitSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    isBad: yup.boolean().required('Task type is required'),
    difficulty: yup.string().required('Difficulty is required'),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(habitSchema),
    defaultValues: {
      title: '',
      notes: '',
      isBad: false,
      points: '',
      difficulty: '',
    },
  });

  const onSubmit = (data) => {
    addData(COLLECTION.HABITS, data);
    setHabitModalVisible(false);
    reset();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={habitModalVisible}
      onRequestClose={() => {
        setHabitModalVisible(!habitModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setHabitModalVisible(false)} />
        <View style={styles.modalView}></View>
        <View style={styles.top}>
          <Button title="Back" onPress={() => setHabitModalVisible(!habitModalVisible)} />
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text style={styles.create}>CREATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.cont}>
            <Text style={styles.text}>TITLE</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput 
                    color={styles.text.color}
                    placeholder="" 
                    onChangeText={onChange} 
                    value={value} />
                  {errors.title && <Text style={styles2.errorText}>{errors.title.message}</Text>}
                </View>
              )}
              name="title"
            />
          </View>
          <View style={styles.cont}>
            <Text style={styles.text}>NOTES</Text>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  color={styles.text.color}
                  placeholder="" 
                  onChangeText={onChange} 
                  value={value} />
              )}
              name="notes"
            />
          </View>
          {errors.taskType && <Text style={styles2.errorText}>{errors.taskType.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.posNeg}>
                <TouchableOpacity
                  style={styles.PosCircle}
                  onPress={() => {
                    onChange(false);
                  }}
                >
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.NegCircle}
                  onPress={() => {
                    onChange(true);
                  }}
                >
                  <Text style={styles.text}>-</Text>
                </TouchableOpacity>
              </View>
            )}
            name="isBad"
          />
          <Text style={styles.text}>DIFFICULTY</Text>
          {errors.difficulty && <Text style={styles2.errorText}>{errors.difficulty.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.difficultyOption}>
                <TouchableOpacity
                  style={styles.easyDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.EASY);
                    setValue('points', POINTS.EASY);
                  }}
                >
                  <Text style={styles.text}>EASY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mediumDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.MEDIUM);
                    setValue('points', POINTS.MEDIUM);
                  }}
                >
                  <Text style={styles.text}>MEDIUM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.HardDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.HARD);
                    setValue('points', POINTS.HARD);
                  }}
                >
                  <Text style={styles.text}>HARD</Text>
                </TouchableOpacity>
              </View>
            )}
            name="difficulty"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles2 =  StyleSheet.create ({
  errorText: {
    color: '#AE0000'
  }
});

export default HabitModal;
