import {View, StyleSheet} from 'react-native';
import React from 'react';
import DateInput from './DateInput';
import TextInput from './TextInput';
import {Note} from '../../types';
import {DateTime} from 'luxon';
import {Text} from '@rneui/themed';

interface NoteFormHeaderProps {
  note: Note | null;
  handleChangeDate: (date: Date) => void;
  handleChangeText: (text: string, name?: string) => void;
}

export default function NoteFormHeader({
  note,
  handleChangeDate,
  handleChangeText,
}: NoteFormHeaderProps) {
  const dateString = DateTime.fromISO(note?.date || new Date().toISOString())
    .setLocale('en-US')
    .toLocaleString(DateTime.DATE_MED);

  return (
    <>
      <TextInput
        containerStyle={style.title}
        value={note?.title || ''}
        placeholder={note?.title || 'New Title'}
        onChangeText={handleChangeText}
        name="title"
        label={'Title'}
      />
      <View style={style.dateDurationContainer}>
        <DateInput
          label="Date"
          containerStyle={style.date}
          date={dateString}
          onConfirm={handleChangeDate}
        />
        <TextInput
          containerStyle={style.duration}
          value={note?.duration.toString() || ''}
          keyboardType="numeric"
          placeholder={note?.duration.toString() || '0'}
          onChangeText={handleChangeText}
          name="duration"
          label="Est. Duration"
        />
      </View>
      <TextInput
        multiline={true}
        label="Description"
        placeholder={note?.description || 'New Description'}
        value={note?.description || ''}
        onChangeText={handleChangeText}
        name="description"
        numberOfLines={4}
        maxLength={160}
      />
      <Text h4>Prescriptions:</Text>
    </>
  );
}

const style = StyleSheet.create({
  title: {
    marginTop: 10,
  },
  dateDurationContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  date: {
    flex: 1,
  },
  duration: {
    flex: 1,
  },
});
