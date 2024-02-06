import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Patient} from '../../types';
import {Avatar, Card, Icon, Text} from '@rneui/themed';

export interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({patient}: PatientCardProps) {
  return (
    <View style={style.container}>
      <Card containerStyle={style.card}>
        <Avatar
          size={64}
          rounded
          title={`${patient.name.charAt(0) + patient.firstname.charAt(0)}`}
          containerStyle={style.avatar}
        />
        <Text
          style={
            style.cardTitle
          }>{`${patient.firstname} ${patient.name}`}</Text>
        <Text style={style.cardDesc}>{patient.summary}</Text>
        <View style={style.cardBottom}>
          <View style={style.hourRate}>
            <Icon name="euro" size={15} color="grey" />
            <Text>{patient.hourRate}</Text>
          </View>
          <Icon name="bookmark-outline" color="grey" />
        </View>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '50%',
  },
  card: {
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
  },
  avatar: {
    backgroundColor: 'grey',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardDesc: {
    fontSize: 14,
    color: 'grey',
  },
  hourRate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
