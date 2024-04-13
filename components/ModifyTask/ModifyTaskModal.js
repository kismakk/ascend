import React, { useState, useEffect} from 'react';
import { View, Button, Modal, Text, Pressable, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './ModifyTaskModal.styles';
import useFirestore from '../../hooks/useFirestore';
import { useForm, Controller } from 'react-hook-form';
import { DIFFICULTY } from '../../constants/difficulty';
import { POINTS } from '../../constants/points';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLLECTION } from '../../constants/collections';
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';

const ModifyTaskModal = ({ modalVisible, setModalVisible, data }) => {
  const { updateData, deleteData, dbError } = useFirestore();
  const todoId = data?.id;
  const { theme } = useTheme();
  const IconColor = COLORS[theme].secondary;
  const styles = getDynamicStyles(theme);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const chopDate = (dueDate) => {
    let tempDate = new Date(dueDate);
    return tempDate.getDate() + '/' + (tempDate.getMonth() +1) + '/' + tempDate.getFullYear();
  }; 
  const [dateText, setDateText] = useState(chopDate(data?.dueDate));

  const onSubmit = (formData) => {
    updateData(COLLECTION.TODOS, formData, todoId);
    setModalVisible(false);
    reset();
  };

  const onDelete = () => {
    deleteData(COLLECTION.TODOS, todoId);
    setModalVisible(false);
    reset();
  };

  const calendarAction = (e, selectedDate) => {
    if (e.type === "dismissed") { 
      setCalendarVisible(false); 
    } else {
      setCalendarVisible(false);
      setSelectedDate(selectedDate);
      let choppedDate = chopDate(selectedDate)
      setDateText(choppedDate);
      setValue('dueDate', selectedDate.toISOString());
    }
  };

  const habitSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    difficulty: yup.string().required('Difficulty is required'),
    dueDate: yup.string().required('Date is required'),
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
      title: data?.title,
      notes: data?.notes,
      points: data?.points,
      difficulty: data?.difficulty,
      dueDate: data?.dueDate
    },
  });
  console.log(data)
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalView}>
        </View>
        <View style={styles.top}>
          <AntDesign name="arrowleft" size={24} color={IconColor}
            onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.topButtons}>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <Text style={styles.modify}>MODIFY</Text>
            </Pressable>
            <Pressable onPress={() => onDelete()}>
              <Text style={styles.delete}>DELETE</Text>
            </Pressable>
          </View>
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
                <>
                  <TextInput
                    color={styles.text.color}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                </>
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
                <>
                  <TextInput
                    color={styles.text.color}
                    placeholder=""
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors.notes && <Text style={styles.errorText}>{errors.notes.message}</Text>}
                </>
              )}
              name="notes"
            />
          </View>
          <Text style={styles.text}>DIFFICULTY</Text>
          {errors.difficulty && <Text style={styles.errorText}>{errors.difficulty.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <View style={styles.difficultyOption}>
                <Pressable
                  style={styles.easyDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.EASY);
                    setValue('points', POINTS.EASY);
                  }}
                >
                  <Text style={styles.text}>EASY</Text>
                </Pressable>
                <Pressable
                  style={styles.mediumDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.MEDIUM);
                    setValue('points', POINTS.MEDIUM);
                  }}
                >
                  <Text style={styles.text}>MEDIUM</Text>
                </Pressable>
                <Pressable
                  style={styles.HardDifficultyBox}
                  onPress={() => {
                    onChange(DIFFICULTY.HARD);
                    setValue('points', POINTS.HARD);
                  }}
                >
                  <Text style={styles.text}>HARD</Text>
                </Pressable>
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
                <Text style={styles.errorText}>{errors.dueDate.message}</Text>
              ) : (
                <Text style={styles.text}>{dateText}</Text>
              )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default ModifyTaskModal;