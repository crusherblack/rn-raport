import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {gql} from 'apollo-boost';

import MainNavigator from './src/navigators/main';
import LoginNavigator from './src/navigators/login';

import {useMutation, useLazyQuery} from 'react-apollo';

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

  const [setLoginTrue] = useMutation(SET_ISLOGIN);
  const [setLogout] = useMutation(SET_LOGOUT);

  const [getIsLogin, {loading, error, data}] = useLazyQuery(GET_ISLOGIN);

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
  };

  console.log(data);

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (data) {
    content = (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {data.isLogin ? (
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
