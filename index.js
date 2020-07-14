/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import React from 'react';

import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ApolloProvider} from '@apollo/react-hooks';

import client from './src/apollo/client';
import 'react-native-gesture-handler';

const Root = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
