import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card, Icon, Text} from '@rneui/themed';
import base, {colors} from '../styles';
import {Note} from '../../types';
import {ellipsis} from '../utils';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({note, onPress}: NoteCardProps) {
  return (
    <View style={base.cardContainer}>
      <Card containerStyle={{...base.card, ...style.card}}>
        <TouchableOpacity onPress={onPress}>
          <Text style={base.cardTitle}>{note.title}</Text>
          <Text style={base.cardDesc}>{ellipsis(note.description, 30)}</Text>
          <View style={base.cardBottom}>
            <View style={base.cardInfo}>
              <Icon name="history" size={15} color={colors.textGrey} />
              <Text style={base.cardInfoText}>{note.duration} min listen</Text>
            </View>
            <Icon name="bookmark-outline" color={colors.textGrey} />
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.darkGrey,
  },
});
