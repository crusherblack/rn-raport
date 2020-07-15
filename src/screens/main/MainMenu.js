import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {gql} from 'apollo-boost';
import {useMutation, useQuery} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';

const SET_AUTH_LOGOUT = gql`
  mutation {
    setAuthLogout @client
  }
`;

const GET_USER_DETAIL = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

const MainMenu = (props) => {
  const [storage, setStorage] = useState();

  useEffect(() => {
    handleGetStorage();
  }, []);

  const handleGetStorage = async () => {
    const infoStorage = await AsyncStorage.getItem('token');
    let responseObject = JSON.parse(infoStorage);
    setStorage(responseObject);
  };

  const {loading, error, data: usersDetail} = useQuery(GET_USER_DETAIL, {
    variables: {id: '5f0da7159ac57b006e2964d1'},
  });

  let content;
  if (loading) {
    content = <Text style={{color: 'black'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'black'}}>{error.message}</Text>;
  } else {
    content = (
      <Text style={{color: 'black'}}>
        {usersDetail.user.firstName} - {usersDetail.user.email}
      </Text>
    );
  }

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
      <Text>Main Menu </Text>
      {content}
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
