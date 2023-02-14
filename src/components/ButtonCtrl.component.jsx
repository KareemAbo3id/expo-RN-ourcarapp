/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Palette from '../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
function TextButtonCtrl({ icon, title, onPress, disabled }) {
  // local ui:
  return (
    <Button
      // specific:
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      // general:
      elevation={0}
      mode="text"
      buttonColor={Palette.Primary}
      contentStyle={Styles.cairoFont}
      uppercase={false}
    >
      {title}
    </Button>
  );
}

function ContainedButtonCtrl({ icon, title, onPress, disabled }) {
  // local ui:
  return (
    <Button
      // specific:
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      // general:
      elevation={0}
      mode="contained"
      buttonColor={Palette.Primary}
      contentStyle={Styles.cairoFont}
      uppercase={false}
    >
      {title}
    </Button>
  );
}

const Styles = StyleSheet.create({
  cairoFont: { fontFamily: 'cairo', letterSpacing: 'normal' },
});

export { ContainedButtonCtrl, TextButtonCtrl };
