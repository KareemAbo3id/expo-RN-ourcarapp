/* eslint-disable global-require */
import React from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { I18nManager, View, StyleSheet } from 'react-native';
import Root from './src/Root';
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function App() {
  const [fontsLoaded] = useFonts({
    'Tajawal-Regular': require('./assets/fonts/Tajawal-Regular.ttf'),
    'Tajawal-Bold': require('./assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Medium': require('./assets/fonts/Tajawal-Medium.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={Styles.SAVStyleForAndroid} onLayout={onLayoutRootView}>
      <Root />
    </View>
  );
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
