import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ListItem, SearchBar} from 'react-native-elements';

const list = [
  {
    name: 'BI KD 3.1',
    subtitle: 'Mencermati gagasan pokok dan gagasan pendukun…',
  },
  {
    name: 'BI KD 4.1',
    subtitle: 'Menata informasi yang didapat dari teks berdasarka…',
  },
  {
    name: 'BI KD 3.2',
    subtitle: 'Mencermati keterhubungan antargagasan yang dida…',
  },
  {
    name: 'BI KD 4.2',
    subtitle: 'Menyajikan hasil pencermatan tentang keterhubung…',
  },
  {
    name: 'BI KD 3.3',
    subtitle: 'Menggali informasi dari seorang tokoh melalui wawa…',
  },
  {
    name: 'BI KD 4.3',
    subtitle: 'Melaporkan hasil wawancara menggunakan kosakat…',
  },
  {
    name: 'BI KD 3.4',
    subtitle: 'Membandingkan teks petunjuk penggunaan dua alat…',
  },
  {
    name: 'BI KD 4.4',
    subtitle: 'Menyajikan petunjuk penggunaan alat dalam bentuk …',
  },
  {
    name: 'BI KD 3.5',
    subtitle: 'Menguraikan pendapat pribadi tentang isi buku sastr…',
  },
  {
    name: 'BI KD 4.5',
    subtitle: 'Mengomunikasikan pendapat pribadi tentang isi buk…',
  },
];

const Subject = ({basicCompetenciesModal, setFieldValue, value, name}) => {
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
      ref={basicCompetenciesModal}
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
          onPress={() => basicCompetenciesModal.current.close()}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Basic Competencies
        </Text>
        <Text style={{color: 'white', marginRight: 10}}>a</Text>
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
      <ScrollView>
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
            onPress={() => setFieldValue(name, l.name)}
          />
        ))}
      </ScrollView>
    </RBSheet>
  );
};

export default Subject;
