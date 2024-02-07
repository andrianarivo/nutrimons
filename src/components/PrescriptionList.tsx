import {View, FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../styles';
import {Button, Icon} from '@rneui/themed';
import {useAppDispatch} from '../hooks';
import {getPrescriptions} from '../redux/prescriptions/prescriptionsSlice';
import {useSelector} from 'react-redux';
import {selectPrescriptions} from '../redux/store';
import PrescriptionDetails from './PrescriptionDetails';

interface PrescriptionListProps {
  noteId: number | undefined;
  onAddPrescription: () => void;
}

export default function PrescriptionList({
  noteId,
  onAddPrescription,
}: PrescriptionListProps) {
  const dispatch = useAppDispatch();
  const {prescriptionItems} = useSelector(selectPrescriptions);

  useEffect(() => {
    dispatch(getPrescriptions(noteId));
  }, [dispatch, noteId, prescriptionItems.length]);

  return (
    <FlatList
      ListFooterComponent={
        <View style={style.addPrescription}>
          <Button
            titleStyle={style.buttonTitle}
            type="clear"
            onPress={onAddPrescription}>
            Add a new prescription
            <Icon name="touch-app" color={colors.sageGreen} />
          </Button>
        </View>
      }
      data={prescriptionItems}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({item}) => <PrescriptionDetails prescription={item} />}
      removeClippedSubviews={false}
    />
  );
}

const style = StyleSheet.create({
  addPrescription: {
    marginVertical: 10,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.sageGreen,
    fontWeight: 'bold',
  },
});
