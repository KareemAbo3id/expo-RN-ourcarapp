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
  StatusBar,
  KeyboardAvoidingView,
  I18nManager,
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
import TOU from '../../components/TOU.component';
import Palette from '../../styles/Colors.style';
import { Font, TextLeft } from '../../styles/Font.style';
import DialogCtrl from '../../components/DialogCtrl.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
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

  // Dialog =============:
  const [showDialog, setShowDialog] = React.useState(false);

  const [dialogContent, setDialogContent] = React.useState('');
  const [closeDialog, setCloseDialog] = React.useState(false);
  const [dialogActionButtonTitle, setDialogActionButtonTitle] =
    React.useState('');

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
    bold: require('./../../assets/fonts/Tajawal-Bold.ttf'),
    medium: require('./../../assets/fonts/Tajawal-Medium.ttf'),
    light: require('./../../assets/fonts/Tajawal-Light.ttf'),
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
          .catch(() => {
            setDialogContent('حدث خطأ');
            setCloseDialog(true);
            setDialogActionButtonTitle('إلغاء');
            setShowDialog(true);
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
          .catch(() => {
            setShowDialog(true);
            setDialogContent('حدث خطأ');
            setCloseDialog(true);
            setDialogActionButtonTitle('إلغاء');
          });
      })
      .catch(() => {
        setShowDialog(true);
        setDialogContent('البريد الالكتروني المدخل مسجل بالفعل');
        setCloseDialog(false);
        setDialogActionButtonTitle('تسجيل الدخول');
      });
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
        content={dialogContent}
        actionButtonOnPress={
          closeDialog
            ? () => {
                setShowDialog(false);
              }
            : () => {
                goTo('login');
              }
        }
        actionButtonTitle={dialogActionButtonTitle}
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
          <ScreenTitle title="انشاء حساب جديد" />
          <Stack spacing={5}>
            <Box>
              {/* 1 LOG EMAIL INPUT ============================= */}
              <InputCtrl
                end={
                  <TextInput.Icon
                    icon={validateNameIcon(localName)}
                    size={20}
                    iconColor={validateNameColor(localName)}
                  />
                }
                contentStyle={{
                  fontFamily: Font.tajawalMedium,
                  textAlign: TextLeft,
                }}
                keyboardType="default"
                textContentType="name"
                placeholder="full name الاسم بالكامل"
                value={localName}
                onChangeText={(text) => setLocalName(text)}
                activeOutlineColor={validateNameColor(localName)}
              />
            </Box>
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
                contentStyle={{
                  fontFamily: Font.tajawalMedium,
                  textAlign: TextLeft,
                }}
                textContentType="password"
                placeholder="password رمز المرور"
                secureTextEntry={!showPassword}
                value={localPassword}
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
            <Box>
              {/* 2 LOG PASSWORD INPUT ========================== */}
              <InputCtrl
                end={
                  <TextInput.Icon
                    icon={validateConPasswordIcon(conPassword, localPassword)}
                    size={20}
                    iconColor={validateConPasswordColor(
                      conPassword,
                      localPassword
                    )}
                  />
                }
                contentStyle={{
                  fontFamily: Font.tajawalMedium,
                  textAlign: TextLeft,
                }}
                textContentType="password"
                placeholder="confirm password تأكيد الرمز"
                secureTextEntry={!showConPassword}
                value={conPassword}
                onChangeText={(password) => setConPassword(password)}
                activeOutlineColor={validateConPasswordColor(
                  conPassword,
                  localPassword
                )}
                start={
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
                style={{ marginRight: -5, fontFamily: Font.tajawalMedium }}
              >
                أوافق على
              </Text>
              <Button
                textColor={Palette.Primary}
                compact
                mode="text"
                labelStyle={{
                  fontFamily: Font.tajawalMedium,
                  lineHeight: 30,
                }}
                onPress={_handlePressButtonAsync}
              >
                سياسة الاستخدام والخصوصية
              </Button>
            </Flex>
            <Box>
              {/* 3 LOGIN BUTTON ================================ */}
              <ContainedButtonCtrl
                title="انشاء الحساب"
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
              <Text style={{ fontFamily: Font.tajawalMedium }}>لديك حساب؟</Text>
              <TextButtonCtrl
                compact
                title="سجل دخولك"
                onPress={() => goTo('login')}
              />
            </Flex>
            <TOU />
          </Stack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
