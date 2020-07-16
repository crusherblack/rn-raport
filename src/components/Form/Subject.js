import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ListItem, SearchBar} from 'react-native-elements';

const list = [
  {
    name: 'Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
  },
  {
    name: 'Bahasa Indonesia (BI)',
  },
  {
    name: 'Matematika (MAT)',
  },
  {
    name: 'Ilmu Pengetahuan Alam (IPA)',
  },
  {
    name: 'Ilmu Pengetahuan Sosial (IPS)',
  },
  {
    name: 'Seni Budaya dan Prakarya (SBdP)',
  },
  {
    name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)',
  },
];

const Subject = ({subjectModal, setFieldValue, value, name}) => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(null);

  useEffect(() => {
    setSelect(value);
  }, [value]);

  const filterQuiz = (text) => {
    setSearch(text);
  };

  return (
    <RBSheet
      dragFromTopOnly={true}
      ref={subjectModal}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: 'white',
        },
      }}
      height={700}>
      <View
        style={{
          marginTop: -15,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
        }}>
        <Icon
          name="close"
          size={30}
          onPress={() => subjectModal.current.close()}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Subject
        </Text>
        <Text style={{color: 'white', marginRight: 20}}>a</Text>
      </View>

      <View
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}>
        <SearchBar
          lightTheme
          inputStyle={{
            color: 'black',
          }}
          inputContainerStyle={{
            backgroundColor: '#F0F2F5',
          }}
          containerStyle={{
            backgroundColor: 'white',
            padding: 0,
            borderRadius: 5,
          }}
          placeholder="Search Subject..."
          onChangeText={(text) => filterQuiz(text)}
          value={search}
        />
      </View>
      <ScrollView
        style={{
          paddingLeft: 5,
          paddingRight: 5,
        }}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            bottomDivider
            titleStyle={{fontWeight: 'bold'}}
            rightElement={
              l.name === select ? (
                <Icon name="check-bold" size={25} color="#FF793F" />
              ) : null
            }
            onPress={() => {
              setFieldValue(name, l.name);
              subjectModal.current.close();
            }}
          />
        ))}
      </ScrollView>
    </RBSheet>
  );
};

export default Subject;
