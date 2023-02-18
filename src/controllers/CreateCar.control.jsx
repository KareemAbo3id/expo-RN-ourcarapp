import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CreateCar() {
  // local hooks:

  // local handlers:

  // local ui:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <Text>CreateCar</Text>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
