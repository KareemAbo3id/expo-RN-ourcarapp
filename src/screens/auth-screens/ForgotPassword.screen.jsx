/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  I18nManager,
} from 'react-native';
import { Box, Stack, Flex, Wrap } from '@react-native-material/core';
import { TextInput, Text } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import LogoAvatar from '../../components/LogoAvatar.component';
import ScreenTitle from '../../components/ScreenTitle.component';
import { firebase } from '../../../config/firebase';
import InputCtrl from '../../components/InputCtrl.component';
import {
  validateEmailColor,
  validateEmailIcon,
  validateForgotPasswordFormSubmit,
} from '../../validations/validation';
import {
  TextButtonCtrl,
  ContainedButtonCtrl,
} from '../../components/ButtonCtrl.component';
import TOU from '../../components/TOU.component';
import Palette from '../../styles/Colors.style';
import { Font, TextLeft } from '../../styles/Font.style';
// imports ////////////////////////////////

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
SplashScreen.preventAutoHideAsync();

// react function /////////////////////////
export default function ForgotPassword() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);
  const [localEmail, setLocalEmail] = React.useState('');
  const [screenVisibale, setScreenVisibale] = React.useState(true);

  // font hook =============:
  const [fontsLoaded] = useFonts({
    bold: require('./../../assets/fonts/Tajawal-Bold.ttf'),
    medium: require('./../../assets/fonts/Tajawal-Medium.ttf'),
    light: require('./../../assets/fonts/Tajawal-Light.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // forget password handler =============:
  const userForgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(localEmail)
      .then(() => {
        setScreenVisibale(!screenVisibale);
      })
      .catch(() => {
        alert('حدث خطأ، حاول مرة اخرى');
      });
  };

  // local ui =============:
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid} onLayout={onLayoutRootView}>
      <StatusBar backgroundColor={Palette.DarkPrimary} />
      {screenVisibale ? (
        <KeyboardAvoidingView>
          <LogoAvatar size={80} />
          <ScreenTitle title="نسيت رمز المرور" />
          <Wrap justify="center" items="center" pv={15}>
            <Text
              style={{ fontFamily: Font.tajawalMedium }}
              variant="bodyMedium"
            >
              ادخل بريدك الالكتروني لارسال ايميل تهيئة رمز المرور
            </Text>
          </Wrap>

          <Stack spacing={5}>
            <Box>
              {/* 1 EMAIL INPUT ============================= */}
              <InputCtrl
                end={
                  <TextInput.Icon
                    icon={validateEmailIcon(localEmail)}
                    size={20}
                    iconColor={validateEmailColor(localEmail)}
                  />
                }
                contentStyle={{
                  fontFamily: Font.tajawalMedium,
                  textAlign: TextLeft,
                }}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="e-mail البريد الالكتروني"
                value={localEmail}
                onChangeText={(text) => setLocalEmail(text)}
                activeOutlineColor={validateEmailColor(localEmail)}
              />
            </Box>
            <Box pt={10}>
              {/* 3 SEND BUTTON ================================ */}
              <ContainedButtonCtrl
                title="ارسال"
                onPress={() => {
                  userForgotPassword(localEmail);
                }}
                disabled={validateForgotPasswordFormSubmit(localEmail)}
              />
            </Box>
            <Flex items="center" justify="center" direction="row">
              {/* NAV BUTTON ================================ */}
              <TextButtonCtrl
                compact
                title="رجوع"
                onPress={() => goTo('login')}
              />
            </Flex>
            <TOU />
          </Stack>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView>
          <LogoAvatar />
          <Wrap justify="center" items="center" direction="column" pv={15}>
            <Text
              style={{ fontFamily: Font.tajawalMedium }}
              variant="bodyMedium"
            >
              تم ارسال رابط تهيئة رمز المرور الى بريدك الالكتروني
            </Text>
            <Text
              style={{ fontFamily: Font.tajawalMedium }}
              variant="bodyMedium"
            >
              {localEmail}
            </Text>
          </Wrap>
          <Flex items="center" justify="center" direction="row">
            <Stack spacing={5}>
              {/* NAV BUTTON ================================ */}
              <ContainedButtonCtrl
                title="الرجوع الى تسجيل الدخول"
                onPress={() => goTo('login')}
              />
            </Stack>
          </Flex>
          <TOU />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    backgroundColor: Palette.White,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
