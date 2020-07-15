import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image} from 'react-native';

const Card = ({image, title, navigation, to}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.push(to)}
      style={{
        height: '40%',
        width: '100%',
        borderWidth: 0.5,
        marginBottom: 40,
      }}>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Image
          source={image}
          blurRadius={1}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            color: 'white',
            fontSize: 60,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
