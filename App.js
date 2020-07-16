import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {gql} from 'apollo-boost';

import MainNavigator from './src/navigators/main';
import LoginNavigator from './src/navigators/login';

import {useMutation, useQuery, useLazyQuery} from '@apollo/react-hooks';

const RootStack = createStackNavigator();

const GET_ISLOGIN = gql`
  query {
    isLogin @client
  }
`;

const SET_ISLOGIN = gql`
  mutation {
    setIsLogin @client
  }
`;

const SET_LOGOUT = gql`
  mutation {
    setAuthLogout @client
  }
`;

const App = () => {
  useEffect(() => {
    getToken();
  }, []);

  const [setLoginTrue, {data: dataLogin}] = useMutation(SET_ISLOGIN);
  const [setLogout, {data: dataLogout}] = useMutation(SET_LOGOUT);

  /* const {
    loading,
    error,
    data: {isLogin},
  } = useQuery(GET_ISLOGIN); */

  const [getIsLogin, {loading, error, data: isLogin}] = useLazyQuery(
    GET_ISLOGIN,
  );

  const getToken = async () => {
    const infoStorage = await AsyncStorage.getItem('token');
    let responseObject = JSON.parse(infoStorage);
    const token = responseObject && responseObject.token;

    if (token) {
      setLoginTrue();
    } else {
      setLogout();
    }

    getIsLogin();

    console.log('useeffect');
  };

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else {
    content = (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {isLogin ? (
            <RootStack.Screen name={'MainStack'} component={MainNavigator} />
          ) : (
            <RootStack.Screen name={'LoginStack'} component={LoginNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  return <>{content}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
