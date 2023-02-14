/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
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
import { TextInput, Checkbox, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import LogoAvatar from '../../components/LogoAvatar.component';
import ScreenTitle from '../../components/ScreenTitle.component';
import { firebase } from '../../../config/firebase';
import InputCtrl from '../../components/InputCtrl.component';
import {
  validateEmailColor,
  validateEmailIcon,
  validatePasswordColor,
  validatePasswordIcon,
  validateNameColor,
  validateNameIcon,
  validateConPasswordColor,
  validateConPasswordIcon,
  validateCreateAccFormSubmit,
} from '../../validations/validation';
import {
  ContainedButtonCtrl,
  TextButtonCtrl,
} from '../../components/ButtonCtrl.component';
import Palette from '../../styles/Colors.style';
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();

// react function /////////////////////////
export default function Signup() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);
  const [localName, setLocalName] = React.useState('');
  const [localEmail, setLocalEmail] = React.useState('');
  const [localPassword, setLocalPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [conPassword, setConPassword] = React.useState('');
  const [showConPassword, setShowConPassword] = React.useState(false);
  const [TOUchecked, setTOUChecked] = React.useState(false);

  // open links in Web Browser:
  const [WEBresult, setWEBResult] = React.useState(null);
  const _handlePressButtonAsync = async () => {
    // eslint-disable-next-line no-unused-vars
    let result = await WebBrowser.openBrowserAsync(
      'https://kareemabo3id.github.io/ourcar-TOU/'
    );
    setWEBResult(WEBresult);
  };

  // font hook =============:
  const [fontsLoaded] = useFonts({
    cairo: require('./../../assets/fonts/Cairo-Regular.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // creact account handler =============:
  const userCreactAccount = async (name, email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://our-car-app-edf68.firebaseapp.com/',
          })
          .then(() => {
            alert(
              'تم إرسال رابط التحقق في الايميل الخاص بك\nالرجاء التحقق من صندوق junk او spam'
            );
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                name,
                email,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // local ui =============:
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView>
        <LogoAvatar />
        <ScreenTitle title="Create Account" />
        <Stack spacing={5}>
          <Box>
            {/* 1 LOG EMAIL INPUT ============================= */}
            <InputCtrl
              start={
                <TextInput.Icon
                  icon={validateNameIcon(localName)}
                  size={20}
                  iconColor={validateNameColor(localName)}
                />
              }
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Type your full name"
              value={localName}
              onChangeText={(text) => setLocalName(text)}
              activeOutlineColor={validateNameColor(localName)}
            />
          </Box>
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
              placeholder="Type new password"
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
          <Box>
            {/* 2 LOG PASSWORD INPUT ========================== */}
            <InputCtrl
              start={
                <TextInput.Icon
                  icon={validateConPasswordIcon(conPassword, localPassword)}
                  size={20}
                  iconColor={validateConPasswordColor(
                    conPassword,
                    localPassword
                  )}
                />
              }
              textContentType="password"
              placeholder="Re-type password"
              value={conPassword}
              onChangeText={(password) => setConPassword(password)}
              activeOutlineColor={validateConPasswordColor(
                conPassword,
                localPassword
              )}
              end={
                <TextInput.Icon
                  onPress={() => setShowConPassword(!showConPassword)}
                  icon={showConPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                />
              }
            />
          </Box>

          <Flex direction="row" justify="start" items="center">
            <Checkbox
              color={Palette.Primary}
              status={TOUchecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setTOUChecked(!TOUchecked);
              }}
            />
            <Text
              onPress={() => {
                setTOUChecked(!TOUchecked);
              }}
              style={{ marginRight: -5 }}
            >
              I agree to
            </Text>
            <Button
              textColor={Palette.Primary}
              compact
              mode="text"
              labelStyle={{
                textDecorationLine: 'underline',
                textDecorationColor: Palette.Primary,
              }}
              onPress={_handlePressButtonAsync}
            >
              Terms of Use Statement.
            </Button>
          </Flex>
          <Box pv={10}>
            {/* 3 LOGIN BUTTON ================================ */}
            <ContainedButtonCtrl
              icon="account-plus"
              title="Create Account"
              onPress={() => {
                userCreactAccount(localName, localEmail, localPassword);
              }}
              disabled={validateCreateAccFormSubmit(
                localName,
                localEmail,
                localPassword,
                conPassword,
                TOUchecked
              )}
            />
          </Box>
          <Flex items="center" justify="center" direction="row">
            {/* NAV BUTTON ================================ */}
            <Text>Already have an account?</Text>
            <TextButtonCtrl
              compact
              icon="login"
              title="Login"
              onPress={() => goTo('login')}
            />
          </Flex>
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
