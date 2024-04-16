import React from 'react';
import { View, Button, Modal, Text, Pressable, SafeAreaView, TextInput } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import getDynamicStyles from './ModifyHabitModal.styles';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import useFirestore from '../../hooks/useFirestore';
import { COLLECTION } from '../../constants/collections';
import { DIFFICULTY } from '../../constants/difficulty';
import { POINTS } from '../../constants/points';
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';

const ModifyHabitModal = ({ modalVisible, setModalVisible, data }) => {
  const { updateData, deleteData, dbError } = useFirestore();
  const habitId = data?.id;
  const { theme } = useTheme();
  const IconColor = COLORS[theme].secondary;
  const styles = getDynamicStyles(theme);

  const habitSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    isBad: yup.boolean().required('Task type is required'),
    difficulty: yup.string().required('Difficulty is required'),
  });
  const onSubmit = (formData) => {
    updateData(COLLECTION.HABITS, formData, habitId);
    setModalVisible(false);
    reset();
  };

  const onDelete = () => {
    deleteData(COLLECTION.HABITS, habitId);
    setModalVisible(false);
    reset();
  };
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
      isBad: data?.isBad,
      points: data?.points,
      difficulty: data?.difficulty,
    },
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        !modalVisible;
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalView}></View>
        <View style={styles.top}>
          <AntDesign name="arrowleft" size={24} color={IconColor}
            onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.topButtons}>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <Text style={styles.accent}>MODIFY</Text>
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
          {errors.isBad && <Text style={styles.errorText}>{errors.isBad.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange } }) => (
              <View style={styles.posNeg}>
                <Pressable
                  style={styles.PosCircle}
                  onPress={() => {
                    onChange(false);
                  }}
                >
                  <Text style={styles.text}>+</Text>
                </Pressable>
                <Pressable
                  style={styles.NegCircle}
                  onPress={() => {
                    onChange(true);
                  }}
                >
                  <Text style={styles.text}>-</Text>
                </Pressable>
              </View>
            )}
            name="isBad"
          />
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
        </View>
      </SafeAreaView>
    </Modal>
  );
};


export default ModifyHabitModal;