import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import PatientCard from '../components/PatientCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useSelector} from 'react-redux';
import {selectPatients} from '../redux/store';
import {Text} from '@rneui/themed';
import {useAppDispatch} from '../hooks';
import {getPatients} from '../redux/patients/patientsSlice';

type PatientListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PatientList'
>;

interface PatientListProps {
  navigation: PatientListNavigationProp;
}

export default function PatientList({navigation}: PatientListProps) {
  const {patientItems, loading, error, errMsg} = useSelector(selectPatients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (patientItems.length > 0) {
      return;
    }
    dispatch(getPatients());
  }, [dispatch, patientItems.length]);

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

  return (
    <FlatList
      data={patientItems}
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
