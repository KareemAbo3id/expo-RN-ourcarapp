/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Flex } from '@react-native-material/core';
import { Text } from 'react-native-paper';
// imports ////////////////////////////////

// react function /////////////////////////
export default function ScreenTitle({ title }) {
  // local hooks, handlers:

  // the ui:
  return (
    <Flex items="center" justify="center">
      <Text
        variant="headlineSmall"
        style={{ fontFamily: 'cairo', lineHeight: 50, textAlign: 'center' }}
      >
        {title}
      </Text>
    </Flex>
  );
}
