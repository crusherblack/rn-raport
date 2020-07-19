import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BasicConfirmModal from './BasicConfirm';

import {ListItem, SearchBar} from 'react-native-elements';

import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo';

const GET_BASIC_COMPETENCIES = gql`
  query($name: String!) {
    competences(where: {name_contains: $name}) {
      id
      name
      description
    }
  }
`;

const Subject = ({
  basicCompetenciesModal,
  setFieldValue,
  value,
  name,
  setBasicComName,
}) => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState(null);
  const [selectedList, setSelectedList] = useState({});
  const basicConfirmModal = useRef();

  const {loading, error, data} = useQuery(GET_BASIC_COMPETENCIES, {
    variables: {
      name: search,
    },
  });

  useEffect(() => {
    setSelect(value);
  }, [value]);

  const filterQuiz = (text) => {
    setSearch(text);
  };

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (data) {
    content = (
      <ScrollView>
        {data.competences.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={l.description}
            bottomDivider
            titleStyle={{fontWeight: 'bold'}}
            rightElement={
              l.id === select ? (
                <Icon name="check-bold" size={25} color="#FF793F" />
              ) : null
            }
            onPress={() => {
              setSelectedList({
                id: l.id,
                title: l.name,
                subtitle: l.description,
              });
              basicConfirmModal.current.open();
            }}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <>
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
        {content}
      </RBSheet>

      <BasicConfirmModal
        basicConfirmModal={basicConfirmModal}
        basicCompetenciesModal={basicCompetenciesModal}
        selectedList={selectedList}
        setFieldValue={setFieldValue}
        name={name}
        setBasicComName={setBasicComName}
      />
    </>
  );
};

export default Subject;
