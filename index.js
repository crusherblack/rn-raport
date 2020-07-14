/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';
import React from 'react';

import {ApolloProvider} from '@apollo/react-hooks';

import client from './src/apollo/client';
import 'react-native-gesture-handler';

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
