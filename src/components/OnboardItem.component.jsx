/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import {
  I18nManager,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Flex } from '@react-native-material/core';
import { Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

const { height, width } = Dimensions.get('window');
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function OnboardItem({ item }) {
  // local hook =============:
  const Palette = usePalette();

  // local ui =============:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <Flex justify="center" items="center" style={{ flex: 0.6 }}>
        <Image source={item.image} style={Styles.image} />
      </Flex>
      <View style={{ flex: 0.3 }}>
        <Text
          variant="displaySmall"
          style={[
            Styles.onboardText,
            { fontFamily: KMFont.Bold, color: Palette.PrimLight },
          ]}
        >
          {item.title}
        </Text>
        <Text
          variant="titleMedium"
          style={[
            Styles.onboardText2,
            { fontFamily: KMFont.Medium, color: Palette.PrimLight },
          ]}
        >
          {item.describe}
        </Text>
      </View>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    width: width * 1,
    paddingHorizontal: 15,
  },
  image: {
    resizeMode: 'contain',
    width: width / 1.55,
    height: height * 0.5,
  },
  onboardText: {
    textAlign: 'center',
  },
  onboardText2: {
    textAlign: 'center',
  },
});
