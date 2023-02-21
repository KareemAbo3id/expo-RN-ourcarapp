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
import { useFonts } from 'expo-font';
import { Flex } from '@react-native-material/core';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native-paper';
import Palette from '../styles/Colors.style';
import { Font } from '../styles/Font.style';

// imports ////////////////////////////////

const { height, width } = Dimensions.get('window');

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function OnboardingItem({ item }) {
  // font hook =============:
  const [fontsLoaded] = useFonts({
    bold: require('../assets/fonts/Tajawal-Bold.ttf'),
    medium: require('../assets/fonts/Tajawal-Medium.ttf'),
    light: require('../assets/fonts/Tajawal-Light.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid} onLayout={onLayoutRootView}>
      <Flex justify="center" items="center" style={{ flex: 0.6 }}>
        <Image source={item.image} style={Styles.image} />
      </Flex>
      <View style={{ flex: 0.4 }}>
        <Text
          variant="displayMedium"
          style={[Styles.onboardText, { fontSize: 50 }]}
        >
          {item.title}
        </Text>
        <Text
          variant="titleLarge"
          style={[Styles.onboardText2, { fontSize: 20 }]}
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
    fontWeight: Font?.tajawalBold,
    color: Palette?.PrimLight,
  },
  onboardText2: {
    fontWeight: Font?.tajawalMedium,
    color: Palette?.PrimLight,
  },
});
