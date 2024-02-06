import {StyleSheet} from 'react-native';
import React from 'react';
import db from '../db';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import NoteCard from '../components/NoteCard';
import {FlatList} from 'react-native-gesture-handler';
import PatientDetailsHeader from '../components/PatientListHeader';

type PatientDetailsNavigationProps = StackScreenProps<
  RootStackParamList,
  'PatientDetails'
>;

interface PatientDetailsProp {
  navigation: PatientDetailsNavigationProps['navigation'];
  route: PatientDetailsNavigationProps['route'];
}

export default function PatientDetails({route}: PatientDetailsProp) {
  const patient =
    db.patients.find(it => it.id === route.params.id) || db.patients[0];
  return (
    <FlatList
      style={style.container}
      data={patient.notes}
      numColumns={2}
      ListHeaderComponent={<PatientDetailsHeader patient={patient} />}
      renderItem={({item}) => <NoteCard note={item} />}
    />
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
});
