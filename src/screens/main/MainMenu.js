import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const MainMenu = (props) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(props.screenProps);

  return (
    <View>
      <Text>Main Menu</Text>
      <TouchableOpacity
        style={styles.containerBtn}
        onPress={() => handleLogout()}>
        <Text style={styles.textBtn}>Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#EE4622',
  },
  textBtn: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
});

export default MainMenu;
