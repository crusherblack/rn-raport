import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {list2} from './list';

const QuizDetail = ({navigation, route}) => {
  const {quizName, deadLine, className, description} = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
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
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          padding: 16,
          paddingTop: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(255, 121, 63, 0.1)',
                padding: 10,
                color: '#FF793F',
                borderRadius: 100,
                marginRight: 20,
              }}>
              <Icon name="clipboard-text" size={30} color="#FF793F"></Icon>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              width: 0,
              flexGrow: 1,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {quizName}
            </Text>
            <Text
              style={{
                color: '#747D8C',
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              15 Questions • 120 mins
            </Text>
          </View>
        </View>

        <View>
          <Text
            style={{
              marginTop: 10,
            }}>
            Deadline
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {' '}
              {deadLine}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}>
            Assigned to
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              {' '}
              {className}
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}>
            {description}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF793F',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('ScoreRecapFormStack')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Save to Student Raport
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {list2.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                source: {
                  uri: `https://i.pravatar.cc/50?img=${Math.floor(
                    Math.random() * 10,
                  )}`,
                },
              }}
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
      </View>
    </SafeAreaView>
  );
};

export default QuizDetail;
