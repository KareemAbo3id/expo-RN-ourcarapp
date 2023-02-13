/* eslint-disable operator-linebreak */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Box } from '@react-native-material/core';
import getLinkFromGithub from '../utils/getLinkFromGithub';
// imports ////////////////////////////////

const link = getLinkFromGithub(
  'KareemAbo3id',
  'expo-RN-ourcarapp',
  'master/src/assets/',
  'in-app-logo.png'
);

// react function /////////////////////////
export default function LogoAvatar() {
  // local hooks, handlers:

  // the ui:
  return (
    <Box style={styles.imageBox}>
      <Avatar
        size={140}
        image={{
          uri: `${link}`,
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
