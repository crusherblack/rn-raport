import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo';

const GET_RAPOT_BY_ID = gql`
  query {
    raports(where: {userId: "5f0da73c9ac57b006e2964d2"}) {
      user {
        firstName
        lastName
        email
      }
      subject {
        name
      }
      competence {
        name
      }
      thematic {
        name
      }
      educationalStage
      class
      semester
      scoreClassification
      score
    }
  }
`;

const Raport = ({navigation}) => {
  const [tableProperty, setTableProperty] = useState({
    tableHead: ['No', 'Subject', 'Score', 'Predicate', 'Description'],
    widthArr: [40, 65, 50, 60, 150],
  });

  const [tableDataRaports, setTableDataRaports] = useState([]);
  const [rataRata, setRataRata] = useState(0);

  const {data, loading, error} = useQuery(GET_RAPOT_BY_ID, {
    onCompleted(data) {
      const convert = data.raports.map((raport, index) => [
        index + 1,
        raport.subject.name,
        raport.score,
        raport.score > 85
          ? 'A'
          : raport.score > 75
          ? 'B'
          : raport.score > 60
          ? 'C'
          : 'D',
        'Deksripsi Here Belum kelar mas',
      ]);

      const filter = convert.map((nilai) => parseInt(nilai[2]));
      const total = filter.reduce((acc, curr) => acc + curr);
      const rataRata = (total / filter.length).toFixed(2);

      setTableDataRaports(convert);
      setRataRata(rataRata);
    },
  });

  const {tableHead, widthArr} = tableProperty;

  let content;
  if (loading) {
    content = <Text style={{color: 'white'}}>Loading...</Text>;
  } else if (error) {
    content = <Text style={{color: 'white'}}>{error.message}</Text>;
  } else if (data) {
    content = (
      <ScrollView>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Name</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>
              {data.raports[0].user.firstName}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Education Stage</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>
              {data.raports[0].educationalStage}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Theme</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>Berbagi Pekerjaan</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Class</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>{data.raports[0].class}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Score Classification</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>
              {data.raports[0].scoreClassification}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Rata Rata</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>{rataRata}</Text>
          </View>
        </View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text}
            widthArr={widthArr}
          />
          <Rows
            data={tableDataRaports}
            textStyle={styles.text}
            widthArr={widthArr}
          />
        </Table>
      </ScrollView>
    );
  }

  return (
    <>
      <Header
        placement="left"
        leftComponent={
          <Icon
            name="chevron-left"
            size={30}
            onPress={() => navigation.goBack()}
          />
        }
        placement="center"
        centerComponent={{
          text: 'Raport',
          style: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <View style={styles.container}>{content}</View>
    </>
  );
};

export default Raport;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  textContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textKiri: {
    width: '40%',
  },
  textTengah: {
    width: '5%',
  },
  textKanan: {
    width: '55%',
    textAlign: 'left',
  },
});
