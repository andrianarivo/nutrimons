import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TextInput from '../components/TextInput';
import {Dropdown} from 'react-native-element-dropdown';
import {Button, Text} from '@rneui/themed';
import base from '../styles';

export default function PatientForm() {
  const data = [
    {label: 'male', value: 'm'},
    {label: 'female', value: 'f'},
  ];
  return (
    <ScrollView contentContainerStyle={style.container}>
      <TextInput label="First Name" value="" />
      <TextInput label="Name" value="" />
      <View style={style.ageSexContainer}>
        <TextInput label="Age" value="" containerStyle={style.halfw} />
        <Dropdown
          data={data}
          renderItem={({label}) => {
            return <Text>{label}</Text>;
          }}
          style={{
            ...style.halfw,
            ...style.dropdown,
          }}
          containerStyle={style.dropdownContainer}
          itemContainerStyle={style.dropdownItemContainer}
          selectedTextStyle={style.dropdownText}
          placeholderStyle={style.dropdownText}
          labelField="label"
          valueField="value"
          onChange={({value}) => {
            console.log(value);
          }}
        />
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
    alignItems: 'center',
  },
  halfw: {
    width: '50%',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    height: 50,
    marginBottom: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  dropdownText: {
    color: 'black',
    paddingLeft: 10,
  },
  dropdownItemContainer: {
    padding: 10,
  },
});
