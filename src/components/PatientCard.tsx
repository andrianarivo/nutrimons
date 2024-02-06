import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Patient} from '../../types';
import {Avatar, Card, Icon, Text} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import base from '../styles';

export interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

export default function PatientCard({patient, onPress}: PatientCardProps) {
  return (
    <View style={base.cardContainer}>
      <Card containerStyle={base.card}>
        <TouchableOpacity onPress={onPress}>
          <Avatar
            size={64}
            rounded
            title={`${patient.name.charAt(0) + patient.firstname.charAt(0)}`}
            containerStyle={{...base.avatar, ...style.avatar}}
          />
          <Text
            style={
              base.cardTitle
            }>{`${patient.firstname} ${patient.name}`}</Text>
          <Text style={base.cardDesc}>{patient.summary}</Text>
          <View style={base.cardBottom}>
            <View style={base.cardInfo}>
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
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
});
