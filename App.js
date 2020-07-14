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

import MainNavigator from './src/navigators/main';
import LoginNavigator from './src/navigators/login';

const RootStack = createStackNavigator();

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
