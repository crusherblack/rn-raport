import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Raport = ({navigation}) => {
  const [tableProperty, setTableProperty] = useState({
    tableHead: ['No', 'Subject', 'Score', 'Predicate', 'Description'],
    widthArr: [40, 65, 50, 60, 150],
    tableData: [
      [
        '1',
        'Ilmu Pengetahuan Alam',
        '83',
        'B',
        'Ananda Andhika sangat baik dalam membandingkan siklus hidup beberapa jenis makhluk hidup serta mengaitkan dengan upaya pelestariannya. baik dalam mengidentifikasi macam-macam gaya, antara lain: gaya otot, gaya listrik, gaya magnet, gaya gravitasi, dan gaya gesekan.',
      ],
    ],
  });

  const {tableHead, widthArr, tableData} = tableProperty;

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
          text: 'Quiz',
          style: {
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Name</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>Andika Hadi</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Education Stage</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>SD/MI</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Theme</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>Berbagi Pekerjaan</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Class</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>I</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textKiri}>Score Classification</Text>
            <Text style={styles.textTengah}>:</Text>
            <Text style={styles.textKanan}>Ulangan Akhir</Text>
          </View>
        </View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text}
            widthArr={widthArr}
          />
          <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
        </Table>
      </View>
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
