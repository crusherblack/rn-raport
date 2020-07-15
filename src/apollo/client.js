import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';

import AsyncStorage from '@react-native-community/async-storage';
import {GRAPHQL_URL} from './config';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {onError} from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {split} from 'apollo-link';

import resolvers from './resolvers';

const httpLink = new HttpLink({
  uri: `${GRAPHQL_URL}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URL}`,
  options: {reconnect: true},
});

const cache = new InMemoryCache();

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');

  console.log(token);
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const httpAuthLink = authLink.concat(httpLink);

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpAuthLink,
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache,
  resolvers,
  connectToDevTools: true,
});

client.cache.writeData({
  data: {
    isModalOpen: false,
    userInfo: null,
    isLogin: false,
  },
});

export default client;
