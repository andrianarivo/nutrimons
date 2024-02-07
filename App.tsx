import React from 'react';
import PatientList from './src/screens/PatientList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PatientDetails from './src/screens/PatientDetails';
import NoteForm from './src/screens/NoteForm';
import {Note, Patient} from './types';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import PatientForm from './src/screens/PatientForm';
import {colors} from './src/styles';

export type RootStackParamList = {
  PatientList: undefined;
  PatientDetails: {id: number};
  NoteForm: {note: Note; patientId: number};
  PatientForm: {patient: Patient | null};
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
          <Stack.Screen name="PatientList" component={PatientList} />
          <Stack.Screen name="PatientDetails" component={PatientDetails} />
          <Stack.Screen name="NoteForm" component={NoteForm} />
          <Stack.Screen name="PatientForm" component={PatientForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
