import React from 'react';
import {View, Text, ScrollView, Button, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const BasicConfirm = ({
  basicCompetenciesModal,
  basicConfirmModal,
  selectedList: {title, subtitle, id},
  name,
  setFieldValue,
}) => {
  return (
    <RBSheet
      dragFromTopOnly={false}
      ref={basicConfirmModal}
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
      height={300}>
      <View
        style={{
          padding: 16,
        }}>
        <Text
          style={{
            color: '#FF793F',
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 5,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 5,
          }}>
          Bahasa Indonesia - Kompetensi Dasar
        </Text>
        <Text>
          Mencermati gagasan pokok dan gagasan pendukung yang diperoleh dari
          teks lisan, tulis, atau visual
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF793F',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => {
            setFieldValue(name, id);
            basicConfirmModal.current.close();
            basicCompetenciesModal.current.close();
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Select
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default BasicConfirm;
