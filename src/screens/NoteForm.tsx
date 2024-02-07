import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import PrescriptionInput from '../components/PrescriptionInput';
import {FlatList} from 'react-native-gesture-handler';
import NoteFormHeader from '../components/NoteFormHeader';
import NoteFormFooter from '../components/NoteFormFooter';
import {Button} from '@rneui/themed';
import db from '../db';
import {addNote, updateNote} from '../redux/notes/notesSlice';
import {useAppDispatch} from '../hooks';

type NoteFormNavigationProps = StackScreenProps<RootStackParamList, 'NoteForm'>;

interface NoteFormProp {
  navigation: NoteFormNavigationProps['navigation'];
  route: NoteFormNavigationProps['route'];
}

export default function NoteForm({route}: NoteFormProp) {
  const originalNote = route.params.note;
  const patientId = route.params.patientId;
  const [note, setNote] = React.useState(originalNote);
  const dispatch = useAppDispatch();

  const handleChangeDate = (date: Date) => {
    note.date = date.toISOString();
  };

  const handleChangeText = (e: string, name?: string) => {
    setNote(prev => {
      const newNote = {...prev};
      if (!name) {
        return newNote;
      }
      newNote[name] = e;
      return newNote;
    });
  };

  const handleChangePrescription = (e: string, name: string, id: number) => {
    setNote(prev => {
      const newNote = {...prev};
      if (newNote.prescriptions) {
        newNote.prescriptions[id][name] = e;
      }
      return newNote;
    });
  };

  const addNewPrescription = () => {
    setNote(prev => {
      const newNote = {...prev};
      newNote.prescriptions?.push({
        name: '',
        dosage: '',
        id: prev.prescriptions?.length ?? 0,
      });
      return newNote;
    });
  };

  const onSubmit = () => {
    const patientIdx = db.patients.findIndex(it => it.id === patientId);
    if (patientIdx) {
      const target = db.patients[patientIdx]?.notes.findIndex(
        it => it.id === note.id,
      );
      if (target > 0) {
        dispatch(updateNote(note));
      } else {
        dispatch(addNote(note));
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.listContainer}>
        <FlatList
          ListHeaderComponent={
            <NoteFormHeader
              note={note}
              handleChangeText={handleChangeText}
              handleChangeDate={handleChangeDate}
            />
          }
          ListFooterComponent={
            <View style={style.addPrescription}>
              <Button type="clear" onPress={addNewPrescription}>
                Add a new prescription
              </Button>
            </View>
          }
          data={note.prescriptions}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({item, index}) => (
            <PrescriptionInput
              prescription={item}
              handleChangePrescription={(text, name) => {
                handleChangePrescription(text, name, index);
              }}
            />
          )}
          removeClippedSubviews={false}
        />
      </View>
      <NoteFormFooter onSubmit={onSubmit} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
  },
  addPrescription: {
    marginVertical: 10,
  },
});
