import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NavModal from '../components/NavModal/NavModal';

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Button title="Nav" onPress={() => setModalVisible(true)} />
      <NavModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Home;
