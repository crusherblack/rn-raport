import React from 'react';
import {View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';

const ModalContent = ({close}) => (
  <View className="Modal">
    <Text style={{color: '#fff'}}>This is a modal!</Text>

    <Button className="CloseButton" onPress={close} title="Close" />
  </View>
);

ModalContent.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalContent;
