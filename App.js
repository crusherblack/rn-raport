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

import {useMutation, useQuery} from '@apollo/react-hooks';

const RootStack = createStackNavigator();

const GET_ISLOGIN = gql`
  query {
    isLogin @client
  }
`;

const App = () => {
  const {
    loading,
    error,
    data: {isLogin},
  } = useQuery(GET_ISLOGIN);
  console.log(isLogin);

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
