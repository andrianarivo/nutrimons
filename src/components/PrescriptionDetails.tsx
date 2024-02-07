import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Text} from '@rneui/themed';
import {Prescription} from '../../types';
import base, {colors} from '../styles';

interface PrescriptionInputProps {
  prescription: Prescription;
}

export default function PrescriptionInput({
  prescription,
}: PrescriptionInputProps) {
  return (
    <View>
      <View style={style.container}>
        <Avatar
          size={40}
          rounded
          title={`${
            prescription.name.charAt(0) +
            prescription.name.charAt(prescription.name.length - 1)
          }`}
          containerStyle={{
            ...base.avatar,
            ...style.avatar,
          }}
        />
        <View style={style.textParent}>
          <Text style={style.textName}>{prescription.name}</Text>
          <Text style={style.textDosage}>{prescription.dosage}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    backgroundColor: colors.hotPink,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: colors.grey,
  },
  textParent: {
    flex: 1,
  },
  textName: {
    padding: 10,
    fontSize: 18,
  },
  textDosage: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  error: {
    display: 'none',
  },
  fab: {
    right: -20,
    bottom: -10,
  },
});
