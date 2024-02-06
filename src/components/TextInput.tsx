import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import {Input} from '@rneui/themed';

interface InputProps {
  value: string;
  placeholder?: string;
  label: string;
  keyboardType?: 'numeric' | 'default';
  containerStyle?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  name?: string;
  onChangeText?: (text: string, name?: string) => void;
}

export default function TextInput({
  value,
  placeholder,
  label,
  keyboardType = 'default',
  multiline,
  maxLength,
  numberOfLines,
  containerStyle,
  name,
  onChangeText,
}: InputProps) {
  return (
    <Input
      containerStyle={containerStyle}
      inputContainerStyle={style.inputContainer}
      inputStyle={style.input}
      keyboardType={keyboardType}
      value={value}
      multiline={multiline}
      placeholder={placeholder}
      label={label}
      maxLength={maxLength}
      onChangeText={text => {
        onChangeText?.(text, name);
      }}
      numberOfLines={numberOfLines}
    />
  );
}

const style = StyleSheet.create({
  inputContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  input: {
    paddingLeft: 10,
    textAlignVertical: 'top',
  },
});
