import React, {useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import {Header, Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MultiButton from '../../components/RadioButton/RadioButton';
import ThematicModal from '../../components/Form/Thematic';
import SubjectModal from '../../components/Form/Subject';
import BasicCompetenciesModal from '../../components/Form/BasicCompetencies';

import {Formik} from 'formik';
import * as yup from 'yup';

/* const FormSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test('is-num-1-5', 'Rating must be number between 1 - 5', (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
}); */

const educationalStage = [
  {
    key: 'SD/MI',
    text: 'SD/MI',
  },
  {
    key: 'SMP/MTs',
    text: 'SMP/MTs',
  },
  {
    key: 'SMA/K',
    text: 'SMA/K',
  },
  {
    key: 'Other',
    text: 'Other',
  },
];

const classData = [
  {
    key: 'I',
    text: 'I',
  },
  {
    key: 'II',
    text: 'II',
  },
  {
    key: 'III',
    text: 'III',
  },
  {
    key: 'IV',
    text: 'IV',
  },
  {
    key: 'V',
    text: 'V',
  },
  {
    key: 'VI',
    text: 'VI',
  },
];

const semester = [
  {
    key: 1,
    text: 1,
  },
  {
    key: 2,
    text: 2,
  },
];

const scoreClassification = [
  {
    key: 'Nilai Harian',
    text: 'Nilai Harian',
  },
  {
    key: 'UTS',
    text: 'UTS',
  },
  {
    key: 'Ulangan Akhir',
    text: 'Ulangan Akhir',
  },
  {
    key: 'Lisan',
    text: 'Lisan',
  },
];

const ScoreRecapForm = ({navigation}) => {
  const thematicModal = useRef();
  const subjectModal = useRef();
  const basicCompetenciesModal = useRef();
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Header
          placement="left"
          leftComponent={
            <Icon name="close" size={30} onPress={() => navigation.goBack()} />
          }
          placement="center"
          centerComponent={{
            text: 'Score Recap',
            style: {
              fontSize: 18,
              fontWeight: 'bold',
            },
          }}
          rightComponent={
            <Button
              title="Save"
              type="outline"
              buttonStyle={{
                borderColor: 'white',
                borderWidth: 1,
                padding: 2,
              }}
              titleStyle={{
                color: '#FF793F',
                fontWeight: 'bold',
              }}
            />
          }
          containerStyle={{
            backgroundColor: 'white',
          }}
        />
        <View
          style={{
            padding: 16,
          }}>
          <Formik
            initialValues={{
              thematic: '',
              subject: '',
              basicCompetencies: '',
              educational: '',
              class: '',
              semester: '',
              score: '',
            }}
            /*    validationSchema={FormSchema} */
            onSubmit={(values, actions) => {
              console.table(values);
              actions.resetForm();
            }}>
            {({
              handleSubmit,
              values,
              setFieldValue,
              handleChange,
              handleBlur,
            }) => (
              <View style={{width: '100%'}}>
                <Text style={styles.title}>Education Stage</Text>
                <MultiButton
                  options={educationalStage}
                  name="educational"
                  value={values.educational}
                  setFieldValue={setFieldValue}
                />

                <Text style={styles.title}>Class</Text>
                <MultiButton
                  options={classData}
                  name="class"
                  value={values.class}
                  setFieldValue={setFieldValue}
                />

                <Text style={styles.title}>Semester</Text>
                <MultiButton
                  options={semester}
                  name="semester"
                  value={values.semester}
                  setFieldValue={setFieldValue}
                />

                <Text style={styles.title}>Thematic</Text>

                <TouchableOpacity onPress={() => thematicModal.current.open()}>
                  <TextInput
                    style={styles.input}
                    value={values.thematic}
                    editable={false}
                  />
                </TouchableOpacity>

                <Text style={styles.title}>Score Classification</Text>
                <MultiButton
                  options={scoreClassification}
                  name="score"
                  value={values.score}
                  setFieldValue={setFieldValue}
                />

                <Text style={styles.title}>Subject</Text>
                <TouchableOpacity onPress={() => subjectModal.current.open()}>
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={values.subject}
                  />
                </TouchableOpacity>

                <Text style={styles.title}>Basic Competencies</Text>
                <TouchableOpacity
                  onPress={() => basicCompetenciesModal.current.open()}>
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={values.basicCompetencies}
                  />
                </TouchableOpacity>

                <ThematicModal
                  thematicModal={thematicModal}
                  name="thematic"
                  setFieldValue={setFieldValue}
                  value={values.thematic}
                />

                <SubjectModal
                  subjectModal={subjectModal}
                  name="subject"
                  setFieldValue={setFieldValue}
                  value={values.subject}
                />

                <BasicCompetenciesModal
                  basicCompetenciesModal={basicCompetenciesModal}
                  name="basicCompetencies"
                  setFieldValue={setFieldValue}
                  value={values.basicCompetencies}
                />
                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <Button title="Submit" onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScoreRecapForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  input: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    color: 'black',
    marginVertical: 8,
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
  },
});
