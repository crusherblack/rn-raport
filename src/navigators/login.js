import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <AuthStack.Screen
        name={'LoginStack'}
        component={Login}></AuthStack.Screen>
      <AuthStack.Screen name={'Registration'} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
