import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Patient} from '../../types';
import {Avatar, Card, Icon, Text} from '@rneui/themed';
import {screenDimensions} from '../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import base from '../styles';

export interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

export default function PatientCard({patient, onPress}: PatientCardProps) {
  return (
    <View style={style.container}>
      <Card containerStyle={style.card}>
        <TouchableOpacity onPress={onPress}>
          <Avatar
            size={64}
            rounded
            title={`${patient.name.charAt(0) + patient.firstname.charAt(0)}`}
            containerStyle={{...base.avatar, ...style.avatar}}
          />
          <Text
            style={
              style.cardTitle
            }>{`${patient.firstname} ${patient.name}`}</Text>
          <Text style={style.cardDesc}>{patient.summary}</Text>
          <View style={style.cardBottom}>
            <View style={style.hourRate}>
              <Icon name="euro" size={15} color="grey" />
              <Text>{patient.hourRate} per hour</Text>
            </View>
            <Icon name="bookmark-outline" color="grey" />
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '50%',
  },
  card: {
    width: screenDimensions.width / 2 - 30,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
  },
  avatar: {
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
