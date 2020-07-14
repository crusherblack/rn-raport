import React from 'react';
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
import {useSelector} from 'react-redux';

import MainNavigator from './src/navigators/main';
import LoginNavigator from './src/navigators/login';

const RootStack = createStackNavigator();

const App = () => {
  const auth = useSelector((state) => state.auth);

  /* const isAuthenticated = false; */
  const {isAuthenticated, loading} = auth;

  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          {isAuthenticated ? (
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
