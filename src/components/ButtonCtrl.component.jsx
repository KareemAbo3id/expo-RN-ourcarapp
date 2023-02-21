/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Font } from '../styles/Font.style';
import Palette from '../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
function TextButtonCtrl({ icon, title, onPress, disabled, compact }) {
  // local ui:
  return (
    <Button
      // specific:
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      compact={compact}
      // general:
      elevation={0}
      mode="text"
      textColor={Palette.Primary}
      style={Styles.radius}
      labelStyle={Styles.mediumFont}
      uppercase={false}
    >
      {title}
    </Button>
  );
}

function ContainedButtonCtrl({ icon, title, onPress, disabled, compact }) {
  // local ui:
  return (
    <Button
      // specific:
      icon={icon}
      onPress={onPress}
      disabled={disabled}
      compact={compact}
      // general:
      elevation={0}
      mode="contained"
      buttonColor={Palette.Primary}
      style={Styles.radius}
      labelStyle={Styles.mediumFont}
      uppercase={false}
    >
      {title}
    </Button>
  );
}

const Styles = StyleSheet.create({
  mediumFont: { fontWeight: Font?.tajawalMedium, lineHeight: 25 },
  radius: { borderRadius: 4 },
});

export { ContainedButtonCtrl, TextButtonCtrl };
