import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';

export default class Raport extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
            textStyle={styles.text}
            widthArr={state.widthArr}
          />
          <Rows
            data={state.tableData}
            textStyle={styles.text}
            widthArr={state.widthArr}
          />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
