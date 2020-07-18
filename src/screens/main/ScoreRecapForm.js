import React, {useRef, useState} from 'react';
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
import Icon2 from 'react-native-vector-icons/FontAwesome';

import MultiButton from '../../components/RadioButton/RadioButton';
import ThematicModal from '../../components/Form/Thematic';
import SubjectModal from '../../components/Form/Subject';
import BasicCompetenciesModal from '../../components/Form/BasicCompetencies';

import {
  educationalStage,
  classData,
  semester,
  scoreClassification,
} from './list';

import {Formik} from 'formik';
import * as yup from 'yup';
import {useMutation} from 'react-apollo';

const FormSchema = yup.object({
  educational: yup.string().required(),
  class: yup.string().required(),
  semester: yup.string().required(),
  thematic: yup.string().required(),
  score: yup.string().required(),
  subject: yup.string().required(),
  basicCompetencies: yup.string().required(),
});

const ScoreRecapForm = ({navigation}) => {
  const [basicComName, setBasicComName] = useState(null);
  const [subjectName, setSubjectName] = useState(null);
  const [thematicName, setThematicName] = useState(null);

  const thematicModal = useRef();
  const subjectModal = useRef();
  const basicCompetenciesModal = useRef();

  /* const [saveRaport, {data}] = useMutation();

  const saveScoreToRaport = () => {
    const oke = new Promise((resolve, reject) => {
      console.log(oke);
    });

    Promise.All([oke])
      .then((result) => {})
      .catch((err) => {});
  }; */

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <Formik
          initialValues={{
            educational: '',
            class: '',
            semester: '',
            thematic: '',
            score: '',
            subject: '',
            basicCompetencies: '',
          }}
          validationSchema={FormSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.resetForm();
          }}>
          {({handleSubmit, values, setFieldValue, errors, touched}) => (
            <View>
              <Header
                placement="left"
                leftComponent={
                  <Icon
                    name="close"
                    size={30}
                    onPress={() => navigation.goBack()}
                  />
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
                    onPress={handleSubmit}
                  />
                }
                containerStyle={{
                  backgroundColor: 'white',
                }}
              />
              <View
                style={{
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <Text
                  style={
                    touched.educational && errors.educational
                      ? styles.textDanger
                      : styles.title
                  }>
                  Education Stage{' '}
                  <Text style={styles.textDanger}>
                    {touched.educational && errors.educational && '*'}
                  </Text>
                </Text>
                <MultiButton
                  options={educationalStage}
                  name="educational"
                  value={values.educational}
                  setFieldValue={setFieldValue}
                />

                <Text
                  style={
                    touched.class && errors.class
                      ? styles.textDanger
                      : styles.title
                  }>
                  Class{' '}
                  <Text style={styles.textDanger}>
                    {touched.class && errors.class && '*'}
                  </Text>
                </Text>
                <MultiButton
                  options={classData}
                  name="class"
                  value={values.class}
                  setFieldValue={setFieldValue}
                />

                <Text
                  style={
                    touched.semester && errors.semester
                      ? styles.textDanger
                      : styles.title
                  }>
                  Semester{' '}
                  <Text style={styles.textDanger}>
                    {touched.semester && errors.semester && '*'}
                  </Text>
                </Text>
                <MultiButton
                  options={semester}
                  name="semester"
                  value={values.semester}
                  setFieldValue={setFieldValue}
                />

                <Text
                  style={
                    touched.thematic && errors.thematic
                      ? styles.textDanger
                      : styles.title
                  }>
                  Thematic{' '}
                  <Text style={styles.textDanger}>
                    {touched.thematic && errors.thematic && '*'}
                  </Text>
                </Text>

                <TouchableOpacity
                  onPress={() => thematicModal.current.open()}
                  style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={values.thematic && thematicName}
                    editable={false}
                    placeholder="e.g. Berbagi Pekerjaan"
                  />
                  <Icon2 name="caret-down" size={20} color="#747D8C" />
                </TouchableOpacity>

                <Text
                  style={
                    touched.score && errors.score
                      ? styles.textDanger
                      : styles.title
                  }>
                  Score Classification{' '}
                  <Text style={styles.textDanger}>
                    {touched.score && errors.score && '*'}
                  </Text>
                </Text>
                <MultiButton
                  options={scoreClassification}
                  name="score"
                  value={values.score}
                  setFieldValue={setFieldValue}
                />

                <Text
                  style={
                    touched.subject && errors.subject
                      ? styles.textDanger
                      : styles.title
                  }>
                  Subject{' '}
                  <Text style={styles.textDanger}>
                    {touched.subject && errors.subject && '*'}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => subjectModal.current.open()}
                  style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={values.subject && subjectName}
                    placeholder="e.g. Bahasa Indonesia"
                  />
                  <Icon2 name="caret-down" size={20} color="#747D8C" />
                </TouchableOpacity>

                <Text
                  style={
                    touched.basicCompetencies && errors.basicCompetencies
                      ? styles.textDanger
                      : styles.title
                  }>
                  Basic Competencies{' '}
                  <Text style={styles.textDanger}>
                    {touched.basicCompetencies &&
                      errors.basicCompetencies &&
                      '*'}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => basicCompetenciesModal.current.open()}
                  style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    editable={false}
                    value={values.basicCompetencies && basicComName}
                    placeholder="e.g. BI KD 3.1"
                  />
                  <Icon2 name="caret-down" size={20} color="#747D8C" />
                </TouchableOpacity>

                <ThematicModal
                  thematicModal={thematicModal}
                  name="thematic"
                  setFieldValue={setFieldValue}
                  value={values.thematic}
                  setThematicName={setThematicName}
                />

                <SubjectModal
                  subjectModal={subjectModal}
                  name="subject"
                  setFieldValue={setFieldValue}
                  value={values.subject}
                  setSubjectName={setSubjectName}
                />

                <BasicCompetenciesModal
                  basicCompetenciesModal={basicCompetenciesModal}
                  name="basicCompetencies"
                  setFieldValue={setFieldValue}
                  value={values.basicCompetencies}
                  setBasicComName={setBasicComName}
                />
              </View>
            </View>
          )}
        </Formik>
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#CED6E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    margin: 0,
    color: 'black',
    fontSize: 16,
  },
  textDanger: {
    color: 'red',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
});
