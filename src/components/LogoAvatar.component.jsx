/* eslint-disable operator-linebreak */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Box } from '@react-native-material/core';
// imports ////////////////////////////////

const appLogoSrc = 'https://raw.githubusercontent.com/KareemAbo3id/';
const appLogoRepo = 'expo-RN-ourcarapp/master/';
const appLogoBase = 'src/assets/our-car-logo.png';

// react function /////////////////////////
export default function LogoAvatar() {
  // local hooks, handlers:

  // the ui:
  return (
    <Box style={styles.imageBox}>
      <Avatar
        size={120}
        image={{
          uri: `${appLogoSrc + appLogoRepo + appLogoBase}`,
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
