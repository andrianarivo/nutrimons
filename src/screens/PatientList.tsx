import {FlatList} from 'react-native';
import React from 'react';
import db from '../db';
import PatientCard from '../components/PatientCard';

export default function PatientList() {
  return (
    <FlatList
      data={db.patients}
      numColumns={2}
      keyExtractor={({id}, _) => id.toString()}
      renderItem={({item}) => <PatientCard patient={item} />}
    />
  );
}
