import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Box } from '@react-native-material/core';
// imports ////////////////////////////////
const ourCarLogo = '../assets/our-car-logo.png';

// react function /////////////////////////
export default function LogoAvatar() {
  // local hooks, handlers:

  // the ui:
  return (
    <Box style={styles.imageBox}>
      <Avatar
        size={120}
        image={{
          uri: `${ourCarLogo}`,
        }}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
