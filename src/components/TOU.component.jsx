/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native-paper';
import Palette from '../styles/Colors.style';
import { Font } from '../styles/Font.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function TOU() {
  // local hooks:

  // open links in Web Browser:
  const [WEBresult, setWEBResult] = React.useState(null);
  const _handlePressButtonAsync = async () => {
    // eslint-disable-next-line no-unused-vars
    const result = await WebBrowser.openBrowserAsync(
      'https://kareemabo3id.github.io/ourcar-TOU/'
    );
    setWEBResult(WEBresult);
  };

  // local ui:
  return (
    <Button
      textColor={Palette.Secondary}
      compact
      mode="text"
      labelStyle={{
        fontWeight: Font?.tajawalMedium,
        lineHeight: 30,
      }}
      onPress={_handlePressButtonAsync}
    >
      سياسة الاستخدام والخصوصية
    </Button>
  );
}
