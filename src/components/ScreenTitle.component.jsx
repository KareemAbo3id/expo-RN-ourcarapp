import React from 'react';
import { Flex, Text } from '@react-native-material/core';
// imports ////////////////////////////////

// react function /////////////////////////
export default function ScreenTitle({ title }) {
  // local hooks, handlers:

  // the ui:
  return (
    <Flex items="center" pb={20} justify="center">
      <Text variant="h6">{title}</Text>
    </Flex>
  );
}
