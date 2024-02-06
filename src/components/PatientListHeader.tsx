import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Tab, Text, Button, Icon} from '@rneui/themed';
import {Patient} from '../../types';
import base from '../styles';

interface PatientDetailsHeaderProps {
  patient: Patient;
}

export default function PatientDetailsHeader({
  patient,
}: PatientDetailsHeaderProps) {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Avatar
        size={128}
        rounded
        title={`${patient.name.charAt(0) + patient.firstname.charAt(0)}`}
        containerStyle={{...base.avatar, ...style.avatar}}
      />
      <View>
        <Text
          style={style.title}
          h4>{`${patient.name} ${patient.firstname}`}</Text>
        <Text style={style.summary}>{patient.summary}</Text>
      </View>
      <View style={style.actions}>
        <Button
          containerStyle={style.takeNoteContainer}
          buttonStyle={style.takeNote}
          size="lg">
          Take note
        </Button>
        <Button buttonStyle={style.bookmark} type="outline" size="md">
          <Icon name="bookmark-outline" />
        </Button>
      </View>

      <Tab containerStyle={style.tab} value={index} onChange={setIndex} dense>
        <Tab.Item>All</Tab.Item>
        <Tab.Item>Bookmarked</Tab.Item>
      </Tab>
    </>
  );
}

const style = StyleSheet.create({
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
  summary: {
    textAlign: 'center',
    color: 'grey',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  takeNoteContainer: {
    flex: 1,
  },
  takeNote: {
    borderRadius: 15,
  },
  bookmark: {
    borderRadius: 12,
    borderWidth: 2,
  },
  tab: {
    marginTop: 10,
  },
});
