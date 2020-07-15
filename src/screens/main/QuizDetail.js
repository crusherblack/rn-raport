import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuizDetail = ({navigation, route}) => {
  const {quizId} = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          padding: 10,
          backgroundColor: 'white',
        }}>
        <Icon
          name="chevron-left"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>Quiz Detail {quizId}</Text>
    </SafeAreaView>
  );
};

export default QuizDetail;
