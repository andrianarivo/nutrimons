import {StyleSheet, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Input} from '@rneui/themed';
import base, {colors} from '../styles';

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
  const [inputContainerStyle, setContainerStyle] = useState(
    style.inputContainer,
  );
  const onFocus = () => {
    setContainerStyle(style.inputContainerFocus);
  };
  const onBlur = () => {
    setContainerStyle(style.inputContainer);
  };

  return (
    <Input
      containerStyle={containerStyle}
      inputContainerStyle={inputContainerStyle}
      inputStyle={style.input}
      keyboardType={keyboardType}
      labelStyle={base.label}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
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
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.borderGrey,
  },
  input: {
    borderRadius: 10,
    paddingLeft: 10,
    textAlignVertical: 'top',
    backgroundColor: colors.lightGrey,
  },
  inputContainerFocus: {
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.tiffanyBlue,
  },
});
