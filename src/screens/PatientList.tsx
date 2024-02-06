import {StyleSheet, View} from 'react-native';
import React from 'react';
import db from '../db';
import PatientCard from '../components/PatientCard';

export default function PatientList() {
  return (
    <View style={style.container}>
      {db.patients.map(patient => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
