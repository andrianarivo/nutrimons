import React from 'react';
import PatientList from './src/screens/PatientList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PatientDetails from './src/screens/PatientDetails';
import NoteForm from './src/screens/NoteForm';
import {Note} from './types';

export type RootStackParamList = {
  PatientList: undefined;
  PatientDetails: {id: number};
  NoteForm: {note: Note};
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PatientList" component={PatientList} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
        <Stack.Screen name="NoteForm" component={NoteForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
