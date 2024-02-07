import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, FAB, Input} from '@rneui/themed';
import {Prescription} from '../../types';
import base, {colors} from '../styles';

interface PrescriptionInputProps {
  prescription: Prescription;
  handleChangePrescription: (text: string, name: string) => void;
}

export default function PrescriptionInput({
  prescription,
  handleChangePrescription,
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
        <View style={style.inputParent}>
          <Input
            value={prescription.name}
            placeholder={prescription.name}
            inputStyle={style.input}
            errorStyle={style.error}
            onChangeText={text => handleChangePrescription(text, 'name')}
          />
          <Input
            value={prescription.dosage}
            placeholder={prescription.dosage}
            multiline={true}
            numberOfLines={2}
            maxLength={80}
            inputContainerStyle={style.inputContainer}
            inputStyle={style.inputDosage}
            errorStyle={style.error}
            onChangeText={text => handleChangePrescription(text, 'dosage')}
          />
          <FAB
            size="small"
            color={colors.hotPink}
            placement="right"
            icon={{name: 'delete', color: colors.white}}
            style={style.fab}
            onPress={() => handleChangePrescription('', 'name')}
          />
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
    borderWidth: 1.5,
    borderColor: colors.borderGrey,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: colors.grey,
  },
  inputParent: {
    flex: 1,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    paddingLeft: 10,
    fontSize: 20,
  },
  error: {
    display: 'none',
  },
  inputDosage: {
    paddingLeft: 10,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  fab: {
    right: -20,
    bottom: -10,
  },
});
