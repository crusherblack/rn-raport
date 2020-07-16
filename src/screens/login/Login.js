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

import {Formik} from 'formik';
import * as yup from 'yup';

const FormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const HANDLE_LOGIN = gql`
  mutation login($email: EmailAddress!, $password: String!) {
    login(input: {email: $email, password: $password}) {
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
      onError({err}) {
        console.log(err);
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

  return (
    <>
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: 'testuser@gmail.com',
            password: 'testuser@gmail.com',
          }}
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            hitLogin({
              variables: {email: values.email, password: values.password},
            });
            actions.resetForm();
          }}>
          {({
            handleSubmit,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                }}>
                WELCOME TO RAPORT APP
              </Text>
              {loginError && (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  Username or Password is Invalid
                </Text>
              )}
              <TextInput
                style={[styles.input, {borderColor: '#CED6E0'}]}
                placeholderTextColor={'darkgray'}
                placeholder={'Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />

              {touched.email && errors.email && (
                <Text
                  style={{
                    color: 'red',
                  }}>
                  {errors.email}
                </Text>
              )}

              <TextInput
                style={[styles.input, {borderColor: '#CED6E0'}]}
                placeholderTextColor={'darkgray'}
                placeholder={'Password'}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
              />

              {touched.password && errors.password && (
                <Text
                  style={{
                    color: 'red',
                  }}>
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity
                style={styles.containerBtnLogin}
                onPress={handleSubmit}>
                <Text style={styles.textBtnLogin}>
                  {loginLoading ? 'Login...' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    color: 'black',
    borderWidth: 1,
    fontSize: 16,
  },
  containerBtnLogin: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 9,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FF793F',
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
