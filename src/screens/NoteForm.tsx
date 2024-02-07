import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import PrescriptionInput from '../components/PrescriptionInput';
import {FlatList} from 'react-native-gesture-handler';
import NoteFormHeader from '../components/NoteFormHeader';
import NoteFormFooter from '../components/NoteFormFooter';
import {Button, Icon} from '@rneui/themed';
import {addNote, updateNote} from '../redux/notes/notesSlice';
import {useAppDispatch} from '../hooks';
import {useSelector} from 'react-redux';
import {selectPatients} from '../redux/store';
import {colors} from '../styles';
import {Note} from '../../types';

type NoteFormNavigationProps = StackScreenProps<RootStackParamList, 'NoteForm'>;

interface NoteFormProp {
  navigation: NoteFormNavigationProps['navigation'];
  route: NoteFormNavigationProps['route'];
}

export default function NoteForm({route}: NoteFormProp) {
  const originalNote = route.params.note;
  const [note, setNote] = useState<Note | null>(originalNote);
  const {patientItems} = useSelector(selectPatients);
  const dispatch = useAppDispatch();

  const handleChangeDate = (date: Date) => {
    if (note) {
      note.date = date.toISOString();
    }
  };

  const handleChangeText = (e: string, name?: string) => {
    setNote(prev => {
      const newNote = Object.create(prev);
      if (!name) {
        return newNote;
      }
      newNote[name] = e;
      return newNote;
    });
  };

  const handleChangePrescription = (e: string, name: string, id: number) => {
    setNote(prev => {
      const newNote = Object.create(prev);
      if (newNote.prescriptions) {
        newNote.prescriptions[id][name] = e;
      }
      return newNote;
    });
  };

  const addNewPrescription = () => {
    const n = note?.prescriptions?.length || 0;
    const newPrescription = {
      id: n + 1,
      name: '',
      dosage: '',
    };
    setNote(prev => {
      const newNote = Object.create(prev);
      if (note?.prescriptions) {
        newNote.prescriptions = [...note.prescriptions, newPrescription];
      } else {
        newNote.prescriptions = [newPrescription];
      }
      return newNote;
    });
  };

  const onSubmit = () => {
    const patientIdx = patientItems.findIndex(it => it.id === note?.patientId);
    const newNote = Object.create(note);
    if (patientIdx >= 0) {
      const target = patientItems[patientIdx]?.notes?.findIndex(
        it => it === note?.id,
      );
      if (target !== undefined && target >= 0) {
        dispatch(updateNote({note: newNote, patientId: note?.patientId || -1}));
      } else {
        dispatch(addNote({note: newNote, patientId: note?.patientId || -1}));
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
              <Button
                titleStyle={style.buttonTitle}
                type="clear"
                onPress={addNewPrescription}>
                Add a new prescription
                <Icon name="touch-app" color={colors.hotPink} />
              </Button>
            </View>
          }
          data={note?.prescriptions}
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
  buttonTitle: {
    fontSize: 16,
    color: colors.hotPink,
    fontWeight: 'bold',
  },
});
