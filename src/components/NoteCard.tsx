import {View} from 'react-native';
import React from 'react';
import {Card, Icon, Text} from '@rneui/themed';
import base from '../styles';
import {Note} from '../../types';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({note}: NoteCardProps) {
  return (
    <View style={base.cardContainer}>
      <Card containerStyle={base.card}>
        <Text style={base.cardTitle}>{note.title}</Text>
        <Text style={base.cardDesc}>{note.description}</Text>
        <View style={base.cardBottom}>
          <View style={base.cardInfo}>
            <Icon name="history" size={15} color="grey" />
            <Text style={base.cardInfoText}>{note.duration} min listen</Text>
          </View>
          <Icon name="bookmark-outline" color="grey" />
        </View>
      </Card>
    </View>
  );
}
