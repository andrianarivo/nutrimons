import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Text, Avatar, Button, Icon, Tab} from '@rneui/themed';
import db from '../db';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import base from '../styles';

type PatientDetailsNavigationProps = StackScreenProps<
  RootStackParamList,
  'PatientDetails'
>;

interface PatientDetailsProp {
  navigation: PatientDetailsNavigationProps['navigation'];
  route: PatientDetailsNavigationProps['route'];
}

export default function PatientDetails({route}: PatientDetailsProp) {
  const patient =
    db.patients.find(it => it.id === route.params.id) || db.patients[0];
  const [index, setIndex] = useState(0);
  return (
    <View style={style.container}>
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
        <Button containerStyle={style.takeNote} size="lg">
          Take note
        </Button>
        <Button containerStyle={style.bookmark} size="lg">
          <Icon name="bookmark-outline" />
        </Button>
      </View>

      <Tab containerStyle={style.tab} value={index} onChange={setIndex} dense>
        <Tab.Item>All</Tab.Item>
        <Tab.Item>Bookmarked</Tab.Item>
      </Tab>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
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
  takeNote: {
    flex: 1,
    borderRadius: 15,
  },
  bookmark: {
    borderRadius: 12,
  },
  tab: {
    marginTop: 10,
  },
});
