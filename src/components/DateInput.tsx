import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, Text} from '@rneui/themed';
import {colors} from '../styles';

interface DateInputProps {
  label?: string;
  date: string;
  onConfirm: (date: Date) => void;
  containerStyle?: ViewStyle | undefined;
}

export default function DateInput({
  date,
  label,
  onConfirm,
  containerStyle,
}: DateInputProps) {
  const [isVisible, setVisibility] = useState(false);
  const showDatePicker = () => {
    setVisibility(true);
  };
  const hideDatePicker = () => {
    setVisibility(false);
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={style.label}>{label}</Text>}
      <Button
        titleStyle={style.title}
        buttonStyle={style.button}
        onPress={showDatePicker}>
        {date}
      </Button>
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={d => {
          onConfirm(d);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.borderGrey,
    borderWidth: 1.5,
    borderRadius: 15,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    color: colors.black,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey,
  },
});
