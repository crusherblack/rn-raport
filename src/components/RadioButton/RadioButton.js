import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {useFormikContext, Formik, Form, Field} from 'formik';

const RadioButton = ({options, setFieldValues}) => {
  const [value, setValue] = useState(null);

  return (
    <View style={{flexDirection: 'row'}}>
      {options.map((item) => {
        return (
          <View key={item.key} style={styles.buttonContainer}>
            <TouchableOpacity
              style={value === item.key ? styles.buttonChecked : styles.button}
              onPress={() => {
                setValue(item.key);
                setFieldValues(item.key);
              }}>
              <Text
                style={value === item.key ? styles.textChecked : styles.text}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'black',
  },
  textChecked: {
    color: '#FF793F',
  },
  buttonChecked: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'rgba(255, 121, 63, 0.1)',
    marginTop: 6,
    marginRight: 12,
    borderRadius: 8,
    borderColor: '#FF793F',
    borderWidth: 1,
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#F0F2F5',
    marginTop: 6,
    marginRight: 12,
    borderRadius: 8,
    borderColor: '#F0F2F5',
    borderWidth: 1,
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
  },
});
