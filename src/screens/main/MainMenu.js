import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {gql} from 'apollo-boost';
import {useMutation} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';

const SET_AUTH_LOGOUT = gql`
  mutation {
    setAuthLogout @client
  }
`;

const MainMenu = (props) => {
  const [setLoginFalse, {data}] = useMutation(SET_AUTH_LOGOUT);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setLoginFalse();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Main Menu</Text>
      <TouchableOpacity
        style={styles.containerBtn}
        onPress={() => handleLogout()}>
        <Text style={styles.textBtn}>Log Out</Text>
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
