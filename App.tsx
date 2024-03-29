import React from 'react';
import PatientList from './src/screens/PatientList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PatientDetails from './src/screens/PatientDetails';
import NoteForm from './src/screens/NoteForm';
import {Note, Patient, Prescription} from './types';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import PatientForm from './src/screens/PatientForm';
import {colors} from './src/styles';
import PrescriptionForm from './src/screens/PrescriptionForm';

export type RootStackParamList = {
  PatientList: undefined;
  PatientDetails: {patientId: number};
  PatientForm: {patient: Patient | null};
  NoteForm: {note: Note | null; patientId: number};
  PrescriptionForm: {prescription: Prescription | null; noteId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {backgroundColor: colors.white},
          }}>
          <Stack.Screen
            name="PatientList"
            options={{title: 'Patients'}}
            component={PatientList}
          />
          <Stack.Screen
            name="PatientDetails"
            options={{title: 'Notes'}}
            component={PatientDetails}
          />
          <Stack.Screen
            name="NoteForm"
            options={{title: 'Add/Edit Note'}}
            component={NoteForm}
          />
          <Stack.Screen
            name="PatientForm"
            options={{title: 'Add Patient'}}
            component={PatientForm}
          />
          <Stack.Screen
            name="PrescriptionForm"
            options={{title: 'Add a Prescription'}}
            component={PrescriptionForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
