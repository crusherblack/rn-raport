import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import {ListItem, SearchBar, Header} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {list} from './list';

const QuizList = ({navigation}) => {
  const [search, setSearch] = useState('');

  const filterQuiz = (text) => {
    setSearch(text);
  };

  return (
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
      <ScrollView>
        {list.map((l, i) => (
          <ListItem
            key={i}
            leftIcon={<Icon name="clipboard-text" size={24} color="#FF793F" />}
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
