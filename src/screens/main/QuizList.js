import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import {ListItem, SearchBar, Header} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {list} from './list';

import {gql, NetworkStatus} from 'apollo-boost';
import {useQuery, useLazyQuery} from 'react-apollo';

import dayjs from 'dayjs';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GET_QUIZ = gql`
  query {
    quizzes {
      id
      name
      description
      endDate
    }
  }
`;

const QuizList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [
    getQuiz,
    {loading, error, data, refetch, networkStatus},
  ] = useLazyQuery(GET_QUIZ, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    getQuiz();
    console.log('run');
  }, []);

  let content;
  if (networkStatus === NetworkStatus.refetch) {
    content = <Text style={{color: 'white'}}>Refetching...</Text>;
  } else if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (data) {
    content = (
      <View>
        {data.quizzes.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={<Icon name="clipboard-text" size={24} color="#FF793F" />}
            title={l.name}
            subtitle={'Deadline ' + dayjs(l.endDate).format('MMMM D YYYY')}
            bottomDivider
            onPress={() =>
              navigation.navigate('QuizDetailStack', {
                quizId: i,
              })
            }
          />
        ))}
      </View>
    );
  }

  const filterQuiz = (text) => {
    setSearch(text);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{color: 'white'}}>
        <Header
          placement="left"
          leftComponent={
            <Icon
              name="chevron-left"
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          placement="center"
          centerComponent={{
            text: 'Quiz',
            style: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
          containerStyle={{
            backgroundColor: 'white',
          }}
        />

        <SearchBar
          lightTheme
          inputStyle={{
            color: 'black',
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
          containerStyle={{
            backgroundColor: 'white',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          placeholder="Search Quiz..."
          onChangeText={(text) => filterQuiz(text)}
          value={search}
        />
        {content}
        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            backgroundColor: '#FF793F',
            padding: 15,
            margin: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
            }}>
            Refetch
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default QuizList;
