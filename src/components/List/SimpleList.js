import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const SimpleList = ({title}) => {
  return (
    <TouchableOpacity
      style={{
        paddingTop: 14,
        paddingBottom: 14,
      }}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SimpleList;
