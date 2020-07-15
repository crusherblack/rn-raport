import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MainMenu from '../screens/main/MainMenu';
import QuizList from '../screens/main/QuizList';
import RaportList from '../screens/main/RaportList';

const MainStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <MainStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <MainStack.Screen
        name={'MainMenuStack'}
        component={MainMenu}></MainStack.Screen>
      <MainStack.Screen
        name={'QuizListStack'}
        component={QuizList}></MainStack.Screen>
      <MainStack.Screen
        name={'RaportListStack'}
        component={RaportList}></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default AuthStackNavigator;
