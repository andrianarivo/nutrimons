import React from 'react';
import PatientList from './src/screens/PatientList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PatientDetails from './src/screens/PatientDetails';

export type RootStackParamList = {
  PatientList: undefined;
  PatientDetails: {id: number};
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PatientList" component={PatientList} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
