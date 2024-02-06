import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';

interface NoteFormFooterProps {
  onSubmit: () => void;
}

export default function NoteFormFooter({onSubmit}: NoteFormFooterProps) {
  return (
    <View style={style.container}>
      <Button buttonStyle={style.button} size="lg" onPress={onSubmit}>
        Save
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 15,
  },
});
