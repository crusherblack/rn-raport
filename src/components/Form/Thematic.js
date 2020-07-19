import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SimpleList from '../List/SimpleList';

import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo';

const GET_THEMATIC = gql`
  query {
    thematics {
      id
      name
    }
  }
`;

const Thematic = ({
  thematicModal,
  value,
  setFieldValue,
  name,
  setThematicName,
}) => {
  const [select, setSelect] = useState(null);

  const {data, error, loading} = useQuery(GET_THEMATIC);

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (data) {
    content = (
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
        {data.thematics.map((data, index) => (
          <View key={index}>
            <SimpleList
              keyData={data.id}
              title={data.name}
              checked={data.id === select ? true : false}
              setSelect={setSelect}
              setFieldValue={setFieldValue}
              name={name}
              thematicModal={thematicModal}
              setThematicName={setThematicName}
            />
          </View>
        ))}
      </ScrollView>
    );
  }

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
      {content}
    </RBSheet>
  );
};

export default Thematic;
