import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SimpleList from '../List/SimpleList';
import {TouchableOpacity} from 'react-native-gesture-handler';

const thematic = [
  {
    key: 'Indahnya Kebersamaan',
    text: 'Indahnya Kebersamaan',
  },
  {
    key: 'Selalu Berhemat Energi',
    text: 'Selalu Berhemat Energi',
  },
  {
    key: 'Peduli Terhadap Makhluk Hidup',
    text: 'Peduli Terhadap Makhluk Hidup',
  },
  {
    key: 'Berbagi Pekerjaan',
    text: 'Berbagi Pekerjaan',
  },
  {
    key: 'Pahlawanku',
    text: 'Pahlawanku',
  },
  {
    key: 'Indahnya Negeriku',
    text: 'Indahnya Negeriku',
  },
  {
    key: 'Cita - citaku',
    text: 'Cita - citaku',
  },
  {
    key: 'Tempat Tinggalku',
    text: 'Tempat Tinggalku',
  },
  {
    key: 'Makananku Sehat dan Bergizi',
    text: 'Makananku Sehat dan Bergizi',
  },
];

const Thematic = ({thematicModal, value, setFieldValue, name}) => {
  const [select, setSelect] = useState(null);

  useEffect(() => {
    setSelect(value);
  }, [value]);

  return (
    <RBSheet
      ref={thematicModal}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        draggableIcon: {
          backgroundColor: '#FF793F',
        },
      }}
      height={550}>
      <ScrollView
        style={{
          padding: 16,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Select Thematic
        </Text>
        {thematic.map((data, index) => (
          <View key={index}>
            <SimpleList
              keyData={data.key}
              title={data.text}
              checked={data.key === select ? true : false}
              setSelect={setSelect}
              setFieldValue={setFieldValue}
              name={name}
              thematicModal={thematicModal}
            />
          </View>
        ))}
      </ScrollView>
    </RBSheet>
  );
};

export default Thematic;
