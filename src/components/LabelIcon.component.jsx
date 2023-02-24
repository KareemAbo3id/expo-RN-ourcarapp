/* eslint-disable react-native/no-inline-styles */
import { Flex } from '@react-native-material/core';
import React from 'react';
import { Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function LabelIcon({ label, color }) {
  // local hooks:

  // local handlers:

  // local ui:
  return (
    <Flex direction="row" justify="start" items="center">
      <Text variant="labelMedium" style={{ color, fontFamily: KMFont.Regular }}>
        {label}
      </Text>
    </Flex>
  );
}
