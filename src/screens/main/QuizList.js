import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import {ListItem, SearchBar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

const QuizList = ({navigation}) => {
  const [search, setSearch] = useState('');

  const filterQuiz = (text) => {
    setSearch(text);
  };

  return (
    <SafeAreaView style={{color: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'white',
        }}>
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 23,
          }}>
          Quiz
        </Text>
        <Text
          style={{
            color: 'white',
          }}>
          {'    a '}
        </Text>
      </View>
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
        }}
        placeholder="Search Quiz..."
        onChangeText={(text) => filterQuiz(text)}
        value={search}
      />
      <ScrollView>
        {list.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={<Icon name="clipboard-text" size={24} />}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
            onPress={() =>
              navigation.navigate('QuizDetailStack', {
                quizId: i,
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizList;
