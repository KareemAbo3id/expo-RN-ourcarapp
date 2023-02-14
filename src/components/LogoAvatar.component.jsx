/* eslint-disable global-require */
/* eslint-disable operator-linebreak */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '@react-native-material/core';
import { Avatar } from 'react-native-paper';
import Palette from '../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function LogoAvatar() {
  // local hooks, handlers:

  // the ui:
  return (
    <Box style={styles.imageBox} mb={20}>
      <Avatar.Image
        source={require('../../assets/icon.png')}
        size={100}
        style={styles.avatarStyle}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  avatarStyle: {
    backgroundColor: Palette.Primary,
    borderRadius: 15,
    shadowColor: Palette.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
