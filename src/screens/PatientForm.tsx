import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TextInput from '../components/TextInput';
import {Button, Icon} from '@rneui/themed';
import base, {colors} from '../styles';
import GenderInput from '../components/GenderInput';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {useAppDispatch} from '../hooks';
import {addPatient} from '../redux/patients/patientsSlice';
import {Patient} from '../../types';

type PatientFormNavigationProps = StackScreenProps<
  RootStackParamList,
  'PatientForm'
>;

interface PatientFormProp {
  navigation: PatientFormNavigationProps['navigation'];
  route: PatientFormNavigationProps['route'];
}

export default function PatientForm({route, navigation}: PatientFormProp) {
  const dispatch = useAppDispatch();
  const originalPatient = route.params.patient;

  const patientValidationSchema = yup.object().shape({
    firstname: yup.string().min(3).required(),
    name: yup.string().min(3).required(),
    age: yup.number().max(150).min(7).required(),
    height: yup.number().required(),
    weight: yup.number().min(15).required(),
    summary: yup.string().min(10).max(150).required(),
    hourRate: yup.number().min(5).required(),
  });

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Formik
        validationSchema={patientValidationSchema}
        initialValues={
          originalPatient || {
            firstname: '',
            name: '',
            age: '',
            height: '',
            weight: '',
            hourRate: '',
            sex: 'm',
            summary: '',
          }
        }
        onSubmit={async values => {
          await dispatch(addPatient(values as Patient));
          navigation.navigate('PatientList');
        }}>
        {({setFieldValue, handleSubmit, handleChange, errors, isValid}) => (
          <>
            <Field
              component={TextInput}
              label="First Name"
              name="firstname"
              placeholder="First Name"
              leftIcon={
                <Icon
                  style={style.icon}
                  color={colors.black}
                  name="supervisor-account"
                />
              }
              onChangeText={handleChange('firstname')}
              errorMessage={errors.firstname}
            />
            <Field
              component={TextInput}
              label="Name"
              name="name"
              placeholder="Name"
              leftIcon={
                <Icon
                  style={style.icon}
                  color={colors.black}
                  name="supervisor-account"
                />
              }
              onChangeText={handleChange('name')}
              errorMessage={errors.name}
            />
            <View style={style.ageSexContainer}>
              <Field
                component={TextInput}
                label="Age"
                name="age"
                placeholder="10"
                keyboardType="numeric"
                containerStyle={base.halfw}
                onChangeText={handleChange('age')}
                errorMessage={errors.age}
              />
              <GenderInput
                containerStyle={base.halfw}
                onChangeGender={(value: string) => {
                  setFieldValue('sex', value);
                }}
              />
            </View>
            <Field
              component={TextInput}
              label="Height"
              keyboardType="numeric"
              placeholder="180"
              name="height"
              leftIcon={
                <Icon style={style.icon} color={colors.black} name="upgrade" />
              }
              onChangeText={handleChange('height')}
              errorMessage={errors.height}
            />
            <Field
              component={TextInput}
              label="Weight"
              keyboardType="numeric"
              placeholder="80"
              name="weight"
              leftIcon={
                <Icon style={style.icon} color={colors.black} name="balance" />
              }
              onChangeText={handleChange('weight')}
              errorMessage={errors.weight}
            />
            <Field
              component={TextInput}
              label="Hour rate in $"
              keyboardType="numeric"
              placeholder="15"
              name="hourRate"
              leftIcon={
                <Icon
                  style={style.icon}
                  color={colors.black}
                  name="hourglass-top"
                />
              }
              onChangeText={handleChange('hourRate')}
              errorMessage={errors.hourRate}
            />
            <Field
              component={TextInput}
              label="Summary"
              multiline
              maxLength={150}
              numberOfLines={4}
              placeholder="New Summary"
              name="summary"
              onChangeText={handleChange('summary')}
              errorMessage={errors.summary}
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
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  ageSexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  icon: {
    marginLeft: 5,
  },
});
