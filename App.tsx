import React from 'react';
import PatientList from './src/screens/PatientList';
import {StyleSheet, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={style.container}>
      <PatientList />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
