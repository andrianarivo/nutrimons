import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {selectPatients, selectPrescriptions} from '../redux/store';
import {getPrescriptions} from '../redux/prescriptions/prescriptionsSlice';
import {deepCopy} from '../utils';
import {colors} from '../styles';

type NoteFormNavigationProps = StackScreenProps<RootStackParamList, 'NoteForm'>;

interface NoteFormProp {
  navigation: NoteFormNavigationProps['navigation'];
  route: NoteFormNavigationProps['route'];
}

export default function NoteForm({route}: NoteFormProp) {
  const originalNote = deepCopy(route.params.note);
  const patientId = route.params.patientId;
  const [note, setNote] = useState(originalNote);
  const {patientItems} = useSelector(selectPatients);
  const {prescriptionItems} = useSelector(selectPrescriptions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPrescriptions({patientId, noteId: originalNote.id}));
  }, [dispatch, patientId, originalNote.id]);

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
    const n = note.prescriptions?.length || 0;
    const newPrescription = {
      id: n + 1,
      name: '',
      dosage: '',
    };
    setNote(prev => {
      const newNote = {...prev};
      if (note.prescriptions) {
        newNote.prescriptions = [...note.prescriptions, newPrescription];
      } else {
        newNote.prescriptions = [newPrescription];
      }
      return newNote;
    });
  };

  const onSubmit = () => {
    const patientIdx = patientItems.findIndex(it => it.id === patientId);
    const newNote = {
      ...note,
      prescriptions: [...prescriptionItems],
    };
    if (patientIdx >= 0) {
      const target = patientItems[patientIdx]?.notes?.findIndex(
        it => it.id === note.id,
      );
      if (target !== undefined && target >= 0) {
        dispatch(updateNote({note: newNote, patientId}));
      } else {
        dispatch(addNote({note: newNote, patientId}));
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
                <Icon name="touch-app" color={colors.tiffanyBlue} />
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
  buttonTitle: {
    fontSize: 16,
    color: colors.tiffanyBlue,
    fontWeight: 'bold',
  },
});
