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

export const HANDLE_LOGIN = gql`
  mutation {
    login(input: {email: "fadhildarma13@gmail.com", password: "kelas2tkj"}) {
      user {
        id
        email
      }
      token
    }
  }
`;

export const GET_USER = gql`
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

  const [login, {data}] = useMutation(HANDLE_LOGIN);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      setToken(await AsyncStorage.getItem('token'));
    } catch (err) {}
  };

  const handleLogin = async () => {
    try {
      login();
      await AsyncStorage.setItem('token', data.login.token);
      setToken(data.login.token);
    } catch (e) {
      // saving error
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
        onPress={() => handleLogin()}>
        <Text style={styles.textBtnLogin}>Login</Text>
      </TouchableOpacity>
      <Text style={{color: 'white'}}>List User</Text>
      {content}
      <Text style={{color: 'white'}}>{token}</Text>
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
