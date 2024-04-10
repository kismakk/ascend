import React, { useState } from 'react';
import { View, Button, Modal, Text, SafeAreaView, TextInput, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './ToDoModal.styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { DIFFICULTY } from '../../constants/difficulty';
import { POINTS } from '../../constants/points';

const ToDoModal = ({ todoModalVisible, setToDoModalVisible }) => {

  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateText, setDateText] = useState('');

  const toDoSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    difficulty: yup.string().required('Difficulty is required'),
    dueDate: yup.string().required('Date is required'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(toDoSchema),
    defaultValues: {
      title: '',
      notes: '',
      difficulty: '',
      points: '',
      dueDate: ''
    },
  });
  
  const calendarAction = (e, selectedDate) => {
    if (e.type === "dismissed") { 
      setCalendarVisible(false); 
    } else {
      setCalendarVisible(false);
      setSelectedDate(selectedDate);
      let tempDate = new Date(selectedDate);
      let choppedDate = tempDate.getDate() + '/' + (tempDate.getMonth() +1) + '/' + tempDate.getFullYear();
      setDateText(choppedDate);
      setValue('dueDate', selectedDate.toISOString());
    }
  }

  //SAMILLE KOPPI TÄSTÄ
  const onSubmit = (data) => console.log(data)
  
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={todoModalVisible}
      onRequestClose={() => {
        setToDoModalVisible(!todoModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setHabitModalVisible(false)} />
        <View style={styles.modalView}>
        </View>
        <View style={styles.top}>
          <Button title="Back" onPress={() => setToDoModalVisible(!todoModalVisible)} />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}>
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
                  placeholder=''
                  onChangeText={onChange}
                  value={value}
                />
                {errors.title && (
                  <Text style={styles2.errorText}>{errors.title.message}</Text>
                )}
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
                placeholder=''
                onChangeText={onChange}
                value={value}
              />
              )}
              name="notes"
            />
          </View> 
          <Text style={styles.text}>DIFFICULTY</Text>
          {errors.difficulty && (
                <Text style={styles2.errorText}>{errors.difficulty.message}</Text>
              )}
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
          <View style={styles.cont} >
            <TouchableOpacity onPress={() => setCalendarVisible(true)}>
              <Text style={styles.text}>Due Date: </Text>
            </TouchableOpacity>
            {calendarVisible && (
              <DateTimePicker 
                value={selectedDate}
                mode='date'
                is24Hour={true}
                locale="fi-FI"
                timeZoneName={'Europe/Helsinki'}
                display='default'
                onChange={calendarAction}
              />
              )}
              {errors.dueDate && !dateText ? (
                <Text style={styles2.errorText}>{errors.dueDate.message}</Text>
              ) : (
                <Text style={styles.text}>{dateText}</Text>
              )}
          </View>
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

export default ToDoModal;
