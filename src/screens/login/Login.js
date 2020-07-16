import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {gql} from 'apollo-boost';

import {useMutation, useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import OpenModelButton from '../../components/OpenModalButton';
import Modal from '../../components/Modal';

const HANDLE_LOGIN = gql`
  mutation {
    login(input: {email: "fadhildarma13@gmail.com", password: "kelas2tkj"}) {
      user {
        id
        email
        firstName
        lastName
      }
      token
    }
  }
`;

const SET_AUTH_LOGIN = gql`
  mutation setAuthLogin($id: String!, $fullName: String!, $email: String!) {
    setAuthLogin(id: $id, fullName: $fullName, email: $email) @client
  }
`;

/* const SET_USER_DATA = gql``;
 */
const GET_USER = gql`
  query users {
    users {
      id
      email
      role
    }
  }
`;

const Login = () => {
  const [token, setToken] = useState('');

  const [hitLogin, {loading: loginLoading, error: loginError}] = useMutation(
    HANDLE_LOGIN,
    {
      onCompleted({login}) {
        setStorageToken(login);
      },
    },
  );

  const [setLoginTrue, {data: setLoginData}] = useMutation(SET_AUTH_LOGIN);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('token'));
    } catch (err) {}
  };

  const setStorageToken = async (login) => {
    try {
      await AsyncStorage.setItem(
        'token',
        JSON.stringify({
          token: login.token,
          userId: login.user.id,
        }),
      );
      setToken(login.token);
      setLoginTrue({
        variables: {
          id: login.user.id,
          fullName: login.user.firstName + ' ' + login.user.lastName,
          email: login.user.email,
        },
      });

      const infoStorage = await AsyncStorage.getItem('token');
      let responseObject = JSON.parse(infoStorage);
      console.log(responseObject);
    } catch (e) {
      console.log(e);
    }
  };

  const {loading, error, data: usersData} = useQuery(GET_USER);

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else {
    content = usersData.users.map((user) => (
      <Text key={user.email} style={{color: 'white'}}>
        {user.email}
      </Text>
    ));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'darkgray'}
        placeholder={'Password'}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.containerBtnLogin}
        onPress={() => hitLogin()}>
        <Text style={styles.textBtnLogin}>
          {loginLoading ? 'Login...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <Text style={{color: 'white'}}>List User</Text>
      {content}
      <Text style={{color: 'white'}}>{token}</Text>
      <OpenModelButton />
      <Modal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  input: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    color: 'black',
    marginVertical: 8,
    fontSize: 16,
  },
  containerBtnLogin: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#EE4622',
  },
  textBtnLogin: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  containerRegister: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textRegister: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
});

export default Login;
