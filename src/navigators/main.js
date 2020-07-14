import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainMenu from '../screens/main/MainMenu';

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
    </MainStack.Navigator>
  );
};

export default AuthStackNavigator;
