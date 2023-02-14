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
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Flex, Box, Stack } from '@react-native-material/core';
import { TextInput } from 'react-native-paper';
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
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();

// react function /////////////////////////
export default function Login() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);
  const [localEmail, setLocalEmail] = React.useState('');
  const [localPassword, setLocalPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

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
        .then(() => {
          alert('أهلاً\nتم تسجيل الدخول بنجاح');
        });
    } catch (error) {
      alert(error.message);
    }
  };

  // local ui =============:
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView>
        <LogoAvatar />
        <ScreenTitle title="Sign In" />
        <Stack spacing={5}>
          <Box>
            {/* 1 LOG EMAIL INPUT ============================= */}
            <InputCtrl
              start={
                <TextInput.Icon
                  icon={validateEmailIcon(localEmail)}
                  size={20}
                  iconColor={validateEmailColor(localEmail)}
                />
              }
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="example@example.com"
              value={localEmail}
              onChangeText={(text) => setLocalEmail(text)}
              activeOutlineColor={validateEmailColor(localEmail)}
            />
          </Box>
          <Box>
            {/* 2 LOG PASSWORD INPUT ========================== */}
            <InputCtrl
              start={
                <TextInput.Icon
                  icon={validatePasswordIcon(localPassword)}
                  size={20}
                  iconColor={validatePasswordColor(localPassword)}
                />
              }
              textContentType="password"
              placeholder="xxxxxxxx"
              value={localPassword}
              onChangeText={(password) => setLocalPassword(password)}
              activeOutlineColor={validatePasswordColor(localPassword)}
              end={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                />
              }
            />
          </Box>
          <Box pv={10}>
            {/* 3 LOGIN BUTTON ================================ */}
            <ContainedButtonCtrl
              icon="login"
              title="Log In"
              onPress={() => {
                userLogin(localEmail, localPassword);
              }}
              disabled={validateSignInFormSubmit(localEmail, localPassword)}
            />
          </Box>
          <Flex items="center" justify="start" direction="column">
            {/* NAV BUTTON ================================ */}
            <TextButtonCtrl
              icon="account-plus-outline"
              title="Don't have an account? Create one"
              onPress={() => goTo('signup')}
            />
          </Flex>
          <Flex items="center" justify="start" direction="column">
            <TextButtonCtrl
              icon="file-outline"
              title="شروط وأحكام"
              onPress={() => goTo('signup')}
            />
          </Flex>
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
