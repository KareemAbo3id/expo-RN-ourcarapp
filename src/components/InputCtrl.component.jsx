/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Palette from '../styles/Colors.style';
import { Font } from '../styles/Font.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function InputCtrl({
  start,
  end,
  keyboardType,
  textContentType,
  placeholder,
  value,
  onChangeText,
  activeOutlineColor,
  contentStyle,
  secureTextEntry,
}) {
  // local hooks:

  // local handlers:

  // local ui:
  return (
    <TextInput
      left={start}
      right={end}
      // specific:
      keyboardType={keyboardType}
      textContentType={textContentType}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      activeOutlineColor={activeOutlineColor}
      // general:
      mode="outlined"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor={Palette.Secondary}
      outlineColor={Palette.Primary}
      contentStyle={contentStyle}
      style={(Styles.tajawal, { backgroundColor: Palette.White })}
    />
  );
}

const Styles = StyleSheet.create({
  tajawal: {
    fontFamily: Font.tajawalMedium,
  },
});
