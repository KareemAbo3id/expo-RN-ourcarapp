/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-else-return */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  I18nManager,
} from 'react-native';
import { Flex, Box, Stack } from '@react-native-material/core';
import { TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LogoAvatar from '../../components/LogoAvatar.component';
import ScreenTitle from '../../components/ScreenTitle.component';
import { firebase } from '../../../config/firebase';
import InputCtrl from '../../components/InputCtrl.component';
import {
  validateEmailColor,
  validateEmailIcon,
  validatePasswordColor,
  validatePasswordIcon,
  validateSignInFormSubmit,
} from '../../validations/validation';
import {
  ContainedButtonCtrl,
  TextButtonCtrl,
} from '../../components/ButtonCtrl.component';
import TOU from '../../components/TOU.component';
import Palette from '../../styles/Colors.style';
import { Font, TextLeft } from '../../styles/Font.style';
import DialogCtrl from '../../components/DialogCtrl.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
SplashScreen.preventAutoHideAsync();

// react function /////////////////////////
export default function Login() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);
  const [localEmail, setLocalEmail] = React.useState('');
  const [localPassword, setLocalPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Dialog =============:
  const [showDialog, setShowDialog] = React.useState(false);

  // font hook =============:
  const [fontsLoaded] = useFonts({
    cairo: require('./../../assets/fonts/Cairo-Regular.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // login handler =============:
  const userLogin = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {});
    } catch (error) {
      setShowDialog(true);
    }
  };

  // local ui =============:
  if (!fontsLoaded) return null;

  if (showDialog) {
    return (
      <DialogCtrl
        visible={showDialog}
        onDismiss={() => {
          setShowDialog(false);
        }}
        content="خطأ في البريد الالكتروني او رمز المرور"
        actionButtonOnPress={() => {
          setShowDialog(false);
        }}
        actionButtonTitle="حاول مجدداً"
      />
    );
  } else {
    return (
      <SafeAreaView
        style={Styles.SAVStyleForAndroid}
        onLayout={onLayoutRootView}
      >
        <StatusBar backgroundColor={Palette.DarkPrimary} />
        <KeyboardAvoidingView>
          <LogoAvatar size={80} />
          <ScreenTitle title="تسجيل الدخول" />
          <Stack spacing={5}>
            <Box>
              {/* 1 LOG EMAIL INPUT ============================= */}
              <InputCtrl
                end={
                  <TextInput.Icon
                    icon={validateEmailIcon(localEmail)}
                    size={20}
                    iconColor={validateEmailColor(localEmail)}
                  />
                }
                contentStyle={{ fontFamily: Font.cairo, textAlign: TextLeft }}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="e-mail البريد الالكتروني"
                value={localEmail}
                onChangeText={(text) => setLocalEmail(text)}
                activeOutlineColor={validateEmailColor(localEmail)}
              />
            </Box>
            <Box>
              {/* 2 LOG PASSWORD INPUT ========================== */}
              <InputCtrl
                end={
                  <TextInput.Icon
                    icon={validatePasswordIcon(localPassword)}
                    size={20}
                    iconColor={validatePasswordColor(localPassword)}
                  />
                }
                contentStyle={{ fontFamily: Font.cairo, textAlign: TextLeft }}
                keyboardType="default"
                textContentType="password"
                placeholder="password رمز المرور"
                value={localPassword}
                secureTextEntry={!showPassword}
                onChangeText={(password) => setLocalPassword(password)}
                activeOutlineColor={validatePasswordColor(localPassword)}
                start={
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                  />
                }
              />
            </Box>
            <Box pt={10}>
              {/* 3 LOGIN BUTTON ================================ */}
              <ContainedButtonCtrl
                title="دخول"
                onPress={() => {
                  userLogin(localEmail, localPassword);
                }}
                disabled={validateSignInFormSubmit(localEmail, localPassword)}
              />
            </Box>
            <Flex items="center" justify="center" direction="row">
              {/* FORGOT PASSWORD BUTTON ================================ */}
              <TextButtonCtrl
                compact
                title="نسيت رمز المرور؟"
                onPress={() => goTo('forgotPassword')}
              />
            </Flex>
            <Flex items="center" justify="center" direction="row">
              {/* NAV BUTTON ================================ */}
              <Text style={{ fontFamily: Font.cairo }}>ليس لديك حساب؟</Text>
              <TextButtonCtrl
                compact
                title="سجل الان"
                onPress={() => goTo('signup')}
              />
            </Flex>
            <TOU />
          </Stack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
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
