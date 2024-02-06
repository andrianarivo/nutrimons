import {FlatList} from 'react-native';
import React from 'react';
import db from '../db';
import PatientCard from '../components/PatientCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type PatientListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PatientList'
>;

interface PatientListProps {
  navigation: PatientListNavigationProp;
}

export default function PatientList({navigation}: PatientListProps) {
  return (
    <FlatList
      data={db.patients}
      numColumns={2}
      keyExtractor={({id}, _) => id.toString()}
      renderItem={({item}) => (
        <PatientCard
          patient={item}
          onPress={() => {
            navigation.navigate('PatientDetails', {id: item.id});
          }}
        />
      )}
    />
  );
}
