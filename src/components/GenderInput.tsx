import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Text} from '@rneui/themed';
import base, {colors} from '../styles';

interface GenderInputProps {
  containerStyle: ViewStyle;
  onChangeGender?: (value: string) => void;
}

export default function GenderInput({
  containerStyle,
  onChangeGender,
}: GenderInputProps) {
  const data = [
    {label: 'male', value: 'm'},
    {label: 'female', value: 'f'},
  ];
  const [dropdownStyle, setDropdownStyle] = useState(style.dropdown);
  const [index, setIndex] = useState(0);

  const onFocus = () => {
    setDropdownStyle(style.dropdownFocus);
  };

  const onBlur = () => {
    setDropdownStyle(style.dropdown);
  };

  const onChange = ({value}: {value: string}) => {
    const newIndex = data.findIndex(item => item.value === value);
    setIndex(newIndex);
    onChangeGender?.(value);
  };

  return (
    <View style={containerStyle}>
      <Text style={base.label}>Gender</Text>
      <Dropdown
        data={data}
        renderItem={({label}) => {
          return <Text>{label}</Text>;
        }}
        style={dropdownStyle}
        value={data[index]}
        containerStyle={style.dropdownContainer}
        itemContainerStyle={style.dropdownItemContainer}
        selectedTextStyle={style.dropdownText}
        placeholderStyle={style.dropdownText}
        labelField="label"
        valueField="value"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

const style = StyleSheet.create({
  dropdown: {
    borderWidth: 1.5,
    borderColor: colors.borderGrey,
    borderRadius: 15,
    backgroundColor: colors.lightGrey,
    height: 50,
    marginBottom: 5,
  },
  dropdownFocus: {
    borderWidth: 1.5,
    borderColor: colors.black,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    height: 50,
    marginBottom: 5,
  },
  dropdownContainer: {
    borderWidth: 1.5,
    borderColor: colors.black,
    borderRadius: 10,
  },
  dropdownText: {
    color: 'black',
    paddingLeft: 10,
  },
  dropdownItemContainer: {
    padding: 10,
    borderRadius: 10,
  },
});
