import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TextInput from '../components/TextInput';
import {Button} from '@rneui/themed';
import base from '../styles';
import GenderInput from '../components/GenderInput';

export default function PatientForm() {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <TextInput label="First Name" value="" />
      <TextInput label="Name" value="" />
      <View style={style.ageSexContainer}>
        <TextInput label="Age" value="" containerStyle={base.halfw} />
        <GenderInput containerStyle={base.halfw} />
      </View>
      <TextInput label="Height" keyboardType="numeric" value="" />
      <TextInput label="Weight" keyboardType="numeric" value="" />
      <TextInput label="Hour rate in $" keyboardType="numeric" value="" />
      <TextInput
        label="Summary"
        multiline
        maxLength={150}
        numberOfLines={4}
        value=""
      />
      <Button buttonStyle={base.button} size="lg" onPress={() => {}}>
        Save
      </Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  ageSexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});
