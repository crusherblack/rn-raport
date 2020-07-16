import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import MainMenu from '../screens/main/MainMenu';
import QuizList from '../screens/main/QuizList';
import RaportList from '../screens/main/RaportList';
import QuizDetail from '../screens/main/QuizDetail';
import ScoreRecap from '../screens/main/ScoreRecapForm';
import Raport from '../screens/main/Raport';

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
      <MainStack.Screen
        name={'QuizDetailStack'}
        component={QuizDetail}></MainStack.Screen>
      <MainStack.Screen
        name={'ScoreRecapFormStack'}
        component={ScoreRecap}></MainStack.Screen>
      <MainStack.Screen
        name={'RaportStack'}
        component={Raport}></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default AuthStackNavigator;
