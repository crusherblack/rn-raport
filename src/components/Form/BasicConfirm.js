import React from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BasicConfirm = ({
  basicCompetenciesModal,
  basicConfirmModal,
  selectedList: {title, subtitle},
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
          backgroundColor: 'transparent',
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
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <Button
          title="Select"
          onPress={() => {
            setFieldValue(name, title);
            basicConfirmModal.current.close();
            basicCompetenciesModal.current.close();
          }}></Button>
      </View>
    </RBSheet>
  );
};

export default BasicConfirm;
