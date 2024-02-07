import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import db from '../db';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import NoteCard from '../components/NoteCard';
import {FlatList} from 'react-native-gesture-handler';
import PatientDetailsHeader from '../components/PatientDetailsHeader';
import {useSelector} from 'react-redux';
import {selectNotes} from '../redux/store';
import {getNotes} from '../redux/notes/notesSlice';
import {useAppDispatch} from '../hooks';
import {Text} from '@rneui/themed';

type PatientDetailsNavigationProps = StackScreenProps<
  RootStackParamList,
  'PatientDetails'
>;

interface PatientDetailsProp {
  navigation: PatientDetailsNavigationProps['navigation'];
  route: PatientDetailsNavigationProps['route'];
}

export default function PatientDetails({
  route,
  navigation,
}: PatientDetailsProp) {
  const patientId = route.params.id;
  const {noteItems, loading, error, errMsg} = useSelector(selectNotes);
  const dispatch = useAppDispatch();
  const patient = db.patients.find(p => p.id === patientId);

  useEffect(() => {
    if (noteItems.length > 0) {
      return;
    }
    dispatch(getNotes(patientId));
  }, [dispatch, patientId, noteItems.length]);

  if (loading) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Text>Error: {errMsg}</Text>
      </>
    );
  }

  const onTakeNote = () => {
    const newNote = {
      id: noteItems.length,
      title: '',
      date: new Date().toISOString(),
      duration: 0,
      description: '',
    };
    navigation.navigate('NoteForm', {
      note: newNote,
      patientId,
    });
  };

  return (
    <FlatList
      style={style.container}
      data={noteItems}
      numColumns={2}
      ListHeaderComponent={
        patient && (
          <PatientDetailsHeader patient={patient} onTakeNote={onTakeNote} />
        )
      }
      renderItem={({item}) => (
        <NoteCard
          note={item}
          onPress={() => {
            navigation.navigate('NoteForm', {
              note: item,
              patientId,
            });
          }}
        />
      )}
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
