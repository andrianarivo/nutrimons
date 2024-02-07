import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Icon, Text} from '@rneui/themed';
import base, {colors} from '../styles';
import DateInput from '../components/DateInput';
import {Field, Formik} from 'formik';
import {readableDate} from '../utils';
import TextInput from '../components/TextInput';
import * as yup from 'yup';
import {useAppDispatch} from '../hooks';
import {Note} from '../../types';
import {addNote} from '../redux/notes/notesSlice';

type NoteFormNavigationProps = StackScreenProps<RootStackParamList, 'NoteForm'>;

interface NoteFormProp {
  navigation: NoteFormNavigationProps['navigation'];
  route: NoteFormNavigationProps['route'];
}

export default function NoteForm({route}: NoteFormProp) {
  const dispatch = useAppDispatch();
  const originalNote = route.params.note;

  const noteValidationSchema = yup.object().shape({
    title: yup.string().min(3).required(),
    duration: yup.number().min(2).required(),
    description: yup.string().min(10).max(150).required(),
    date: yup.date().required(),
  });

  return (
    <View style={style.container}>
      <Formik
        validationSchema={noteValidationSchema}
        initialValues={
          originalNote || {
            title: '',
            date: new Date().toISOString(),
            duration: '0',
            description: '',
          }
        }
        onSubmit={values => {
          dispatch(addNote(values as Note));
        }}>
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          isValid,
        }) => (
          <>
            <Field
              component={TextInput}
              containerStyle={style.title}
              placeholder="New Title"
              label={'Title'}
              onChangeText={handleChange('title')}
              errorMessage={errors.title}
            />
            <View style={style.dateDurationContainer}>
              <DateInput
                label="Date"
                containerStyle={style.date}
                date={readableDate(values.date)}
                onConfirm={(date: Date) => {
                  setFieldValue('date', date.toISOString());
                }}
              />
              <Field
                component={TextInput}
                containerStyle={style.duration}
                keyboardType="numeric"
                placeholder="0"
                label="Est. Duration"
                onChangeText={handleChange('duration')}
                errorMessage={errors.duration}
              />
            </View>
            <Field
              component={TextInput}
              multiline={true}
              label="Description"
              placeholder="New Description"
              numberOfLines={4}
              maxLength={160}
              onChangeText={handleChange('description')}
              errorMessage={errors.description}
            />
            <Text h4>Prescriptions:</Text>
            <FlatList
              ListFooterComponent={
                <View style={style.addPrescription}>
                  <Button titleStyle={style.buttonTitle} type="clear">
                    Add a new prescription
                    <Icon name="touch-app" color={colors.hotPink} />
                  </Button>
                </View>
              }
              data={[1, 2]}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({item}) => <Text>{item}</Text>}
              removeClippedSubviews={false}
            />
            <Button
              buttonStyle={base.button}
              titleStyle={base.buttonTitle}
              size="lg"
              disabled={!isValid}
              onPress={() => {
                handleSubmit();
              }}>
              Save
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  addPrescription: {
    marginVertical: 10,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.hotPink,
    fontWeight: 'bold',
  },
  title: {
    marginTop: 10,
  },
  dateDurationContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  date: {
    flex: 1,
  },
  duration: {
    flex: 1,
  },
});
