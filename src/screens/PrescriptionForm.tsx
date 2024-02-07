import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Formik, Field} from 'formik';
import {Prescription} from '../../types';
import TextInput from '../components/TextInput';
import {Button} from '@rneui/themed';
import base from '../styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useAppDispatch} from '../hooks';
import {addPrescription} from '../redux/prescriptions/prescriptionsSlice';
import * as yup from 'yup';

type PrescriptionFormNavigationProps = StackScreenProps<
  RootStackParamList,
  'PrescriptionForm'
>;

interface PrescriptionFormProp {
  navigation: PrescriptionFormNavigationProps['navigation'];
  route: PrescriptionFormNavigationProps['route'];
}

export default function PrescriptionForm({
  route,
  navigation,
}: PrescriptionFormProp) {
  const dispatch = useAppDispatch();
  const originalPrescription = route.params.prescription;
  const noteId = route.params.noteId;

  const prescriptionValidationSchema = yup.object().shape({
    name: yup.string().min(3).required(),
    dosage: yup.string().min(10).max(150).required(),
  });

  return (
    <View style={style.container}>
      <Formik
        validationSchema={prescriptionValidationSchema}
        initialValues={
          originalPrescription || {
            name: '',
            dosage: '',
            noteId: noteId,
          }
        }
        onSubmit={async values => {
          console.log('values', values);
          await dispatch(addPrescription(values as Prescription));
          navigation.goBack();
        }}>
        {({handleSubmit, handleChange, errors, isValid}) => (
          <>
            <Field
              component={TextInput}
              label="Name"
              placeholder="Name of The Medicine"
              onChangeText={handleChange('name')}
              errorMessage={errors.name}
            />
            <Field
              component={TextInput}
              label="Dosage"
              multiline
              maxLength={150}
              numberOfLines={4}
              placeholder="Explain The dosage"
              onChangeText={handleChange('dosage')}
              errorMessage={errors.dosage}
            />
            <Button
              titleStyle={base.buttonTitle}
              buttonStyle={base.button}
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
      <Text>PrescriptionForm</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
