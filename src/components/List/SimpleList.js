import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SimpleList = ({
  keyData,
  title,
  checked,
  name,
  setFieldValue,
  thematicModal,
  setThematicName,
}) => {
  const styles = {
    style1: {
      fontWeight: 'bold',
    },
  };

  return (
    <TouchableOpacity
      style={{
        paddingTop: 14,
        paddingBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => {
        setThematicName(title);
        thematicModal.current.close();
        setFieldValue(name, keyData);
      }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
      {checked && <Icon name="check-bold" size={25} color="#FF793F" />}
    </TouchableOpacity>
  );
};

export default SimpleList;
