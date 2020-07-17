import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {gql} from 'apollo-boost';
import {useMutation, useQuery, useLazyQuery} from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import Card from '../../components/Card/Card';

import Menu1 from '../../img/menu1.jpg';
import Menu2 from '../../img/menu2.jpg';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const MainMenu = ({navigation}) => {
  const [storageUserId, setStorage] = useState();

  useEffect(() => {
    handleGetStorage();
  }, []);

  const handleGetStorage = async () => {
    const infoStorage = await AsyncStorage.getItem('token');
    let responseObject = JSON.parse(infoStorage);
    setStorage(responseObject.userId);
    getUserDetails();
  };

  const [getUserDetails, {loading, error, data: usersDetail}] = useLazyQuery(
    GET_USER_DETAIL,
    {
      variables: {id: storageUserId},
    },
  );

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (usersDetail) {
    content = (
      <View>
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
          }}>
          RAPORT APP{' '}
          <Icon
            name="logout"
            color="#FF793F"
            size={30}
            onPress={() => handleLogout()}
          />
        </Text>
        <Text style={styles.textColor}>
          {usersDetail.user.firstName} {usersDetail.user.lastName}
        </Text>
        <Text style={styles.textColor}>{usersDetail.user.email}</Text>
      </View>
    );
  }

  const [setLoginFalse, {data}] = useMutation(SET_AUTH_LOGOUT);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');

      setLoginFalse();
      console.log('logout');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={{flex: 2, backgroundColor: 'black'}}>
        <View style={styles.containerTop}>{content}</View>
        <View style={styles.containerMiddle}>
          <Card
            image={Menu1}
            title="Quiz"
            navigation={navigation}
            to="QuizListStack"
          />
          <Card
            image={Menu2}
            title="Raport"
            navigation={navigation}
            to="RaportStack"
          />
          {/* <TouchableOpacity
            style={styles.containerBtn}
            onPress={() => handleLogout()}>
            <Text style={styles.textBtn}>Log Out</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    color: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMiddle: {
    backgroundColor: '#e1e1e1',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textColor: {
    color: 'white',
    fontSize: 15,
  },
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
