import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Tab, Text, Button, Icon} from '@rneui/themed';
import {Patient} from '../../types';
import base, {colors} from '../styles';

interface PatientDetailsHeaderProps {
  patient: Patient;
  onTakeNote?: () => void;
}

export default function PatientDetailsHeader({
  patient,
  onTakeNote,
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
          containerStyle={style.takeNote}
          buttonStyle={base.button}
          titleStyle={base.buttonTitle}
          onPress={onTakeNote}
          size="lg">
          Take note
        </Button>
        <Button buttonStyle={style.bookmark} type="outline" size="md">
          <Icon name="bookmark-outline" color={colors.tiffanyBlue} />
        </Button>
      </View>

      <Tab
        titleStyle={style.tabTitle}
        containerStyle={style.tab}
        indicatorStyle={style.tabIndicator}
        value={index}
        onChange={setIndex}
        dense>
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
    backgroundColor: colors.yellow,
    borderColor: colors.darkGrey,
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
  takeNote: {
    flex: 1,
  },
  bookmark: {
    borderColor: colors.tiffanyBlue,
    borderRadius: 12,
    borderWidth: 2,
  },
  tab: {
    marginTop: 10,
  },
  tabTitle: {
    color: colors.darkGrey,
  },
  tabIndicator: {
    backgroundColor: colors.darkGrey,
    height: 1,
  },
});
