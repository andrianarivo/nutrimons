import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TextInput from '../components/TextInput';
import {Button, Icon} from '@rneui/themed';
import base, {colors} from '../styles';
import GenderInput from '../components/GenderInput';

export default function PatientForm() {
  return (
    <ScrollView contentContainerStyle={style.container}>
      <TextInput
        label="First Name"
        value=""
        leftIcon={
          <Icon
            style={style.icon}
            color={colors.black}
            name="supervisor-account"
          />
        }
      />
      <TextInput
        label="Name"
        value=""
        leftIcon={<Icon style={style.icon} color={colors.black} name="face" />}
      />
      <View style={style.ageSexContainer}>
        <TextInput label="Age" value="" containerStyle={base.halfw} />
        <GenderInput containerStyle={base.halfw} />
      </View>
      <TextInput
        label="Height"
        keyboardType="numeric"
        value=""
        leftIcon={
          <Icon style={style.icon} color={colors.black} name="upgrade" />
        }
      />
      <TextInput
        label="Weight"
        keyboardType="numeric"
        value=""
        leftIcon={
          <Icon style={style.icon} color={colors.black} name="balance" />
        }
      />
      <TextInput
        label="Hour rate in $"
        keyboardType="numeric"
        value=""
        leftIcon={
          <Icon style={style.icon} color={colors.black} name="hourglass-top" />
        }
      />
      <TextInput
        label="Summary"
        multiline
        maxLength={150}
        numberOfLines={4}
        value=""
      />
      <Button
        titleStyle={base.buttonTitle}
        buttonStyle={base.button}
        size="lg"
        onPress={() => {}}>
        Save
      </Button>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  ageSexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  icon: {
    marginLeft: 5,
  },
});
