/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native-paper';
import Palette from '../styles/Colors.style';
import { Font } from '../styles/Font.style';

// imports ////////////////////////////////

// react function /////////////////////////
export default function Version() {
  // local hooks:

  // local handlers:

  // local ui:
  return (
    <Text
      style={{
        color: Palette.Secondary,
        textAlign: 'center',
        fontFamily: Font.cairo,
      }}
    >
      نسخة تجريبية V1.0.0
    </Text>
  );
}
