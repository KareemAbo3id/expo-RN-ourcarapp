import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../../firebase/firebase'
import { Flex, Box } from '@react-native-material/core';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';
import {
  validateEmailColor,
  validateEmailIcon,
  validatePasswordColor,
  validatePasswordIcon,
  validateNameColor,
  validateNameIcon,
  validateConPasswordColor,
  validateConPasswordIcon,
} from '../../validations/validation';

// hooks:
import useNav from '../../hooks/useNav.hook';
import KMFont from '../../hooks/useFont.hook';
import usePalette from '../../hooks/usePalette.hook';
import useLink from '../../hooks/useLink.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function Signup() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // local hooks =============:
  const [localName, setLocalName] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [conPassword, setConPassword] = useState('');
  const [showConPassword, setShowConPassword] = useState(false);
  const [TOUchecked, setTOUChecked] = useState(false);

  // Creact Account handler =============:
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
            alert('خطأ غير معروف، حاول مرة اخرى');
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
            alert('خطأ غير معروف، حاول مرة اخرى');
          });
      })
      .catch(() => {
        alert('البريد الالكتروني المدخل مسجل بالفعل');
      });
  };

  // local ui =============:

  return (
    <SafeAreaView
      style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}
    >
      <StatusBar backgroundColor="transparent" translucent />
      <KeyboardAvoidingView behavior="padding">
        {/* WELCOME ========================== */}
        <Flex items="center" justify="center" pb={15}>
          <Image
            source={require('../../assets/images/user.png')}
            style={Styles.image}
          />
          <Text
            variant="headlineLarge"
            style={{ fontFamily: KMFont.Bold, color: Palette.PrimLight }}
          >
            انشئ حسابك
          </Text>
        </Flex>
        {/* WELCOME ========================== */}

        {/* INPUTS ========================== */}
        <Flex direction="column" justify="center" items="stretch">
          <Box>
            <TextInput
              right={
                <TextInput.Icon
                  icon={validateNameIcon(localName)}
                  size={20}
                  iconColor={validateNameColor(localName)}
                />
              }
              keyboardType="default"
              textContentType="name"
              placeholder="ادخل اسمك"
              value={localName}
              onChangeText={(text) => setLocalName(text)}
              // styles:
              mode="outlined"
              autoCapitalize="words"
              activeOutlineColor="transparent"
              placeholderTextColor={Palette.SecDark}
              cursorColor={Palette.Primary}
              style={[
                Styles.TextInputStyle,
                { backgroundColor: Palette.PrimLight },
              ]}
              contentStyle={[
                Styles.TextInputContentStyle,
                { fontFamily: KMFont.Regular, color: Palette.PrimDark },
              ]}
              outlineStyle={{ borderRadius: 1000 }}
            />
          </Box>
          <Box>
            <TextInput
              right={
                <TextInput.Icon
                  icon={validateEmailIcon(localEmail)}
                  size={20}
                  iconColor={validateEmailColor(localEmail)}
                />
              }
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="البريد الالكتروني"
              value={localEmail}
              mode="outlined"
              autoCapitalize="none"
              activeOutlineColor="transparent"
              placeholderTextColor={Palette.SecDark}
              cursorColor={Palette.Primary}
              style={[
                Styles.TextInputStyle,
                { backgroundColor: Palette.PrimLight },
              ]}
              contentStyle={[
                Styles.TextInputContentStyle,
                { fontFamily: KMFont.Regular, color: Palette.PrimDark },
              ]}
              outlineStyle={{ borderRadius: 1000 }}
            />
          </Box>
          <Box>
            <TextInput
              right={
                <TextInput.Icon
                  icon={validatePasswordIcon(localPassword)}
                  size={20}
                  iconColor={validatePasswordColor(localPassword)}
                />
              }
              left={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                />
              }
              textContentType="password"
              placeholder="رمز المرور"
              secureTextEntry={!showPassword}
              value={localPassword}
              onChangeText={(password) => setLocalPassword(password)}
              mode="outlined"
              autoCapitalize="none"
              activeOutlineColor="transparent"
              placeholderTextColor={Palette.SecDark}
              cursorColor={Palette.Primary}
              style={[
                Styles.TextInputStyle,
                { backgroundColor: Palette.PrimLight },
              ]}
              contentStyle={[
                Styles.TextInputContentStyle,
                { fontFamily: KMFont.Regular, color: Palette.PrimDark },
              ]}
              outlineStyle={{ borderRadius: 1000 }}
            />
          </Box>
          <Box>
            <TextInput
              right={
                <TextInput.Icon
                  icon={validateConPasswordIcon(conPassword, localPassword)}
                  size={20}
                  iconColor={validateConPasswordColor(
                    conPassword,
                    localPassword
                  )}
                />
              }
              left={
                <TextInput.Icon
                  onPress={() => setShowPassword(!showPassword)}
                  icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                />
              }
              textContentType="password"
              placeholder="تأكيد الرمز"
              secureTextEntry={!showConPassword}
              value={conPassword}
              onChangeText={(password) => setConPassword(password)}
              mode="outlined"
              autoCapitalize="none"
              activeOutlineColor="transparent"
              placeholderTextColor={Palette.SecDark}
              cursorColor={Palette.Primary}
              style={[
                Styles.TextInputStyle,
                { backgroundColor: Palette.PrimLight },
              ]}
              contentStyle={[
                Styles.TextInputContentStyle,
                { fontFamily: KMFont.Regular, color: Palette.PrimDark },
              ]}
              outlineStyle={{ borderRadius: 1000 }}
            />
          </Box>
        </Flex>
        {/* INPUTS ========================== */}

        <Flex direction="column" justify="center" items="stretch">
          {/* TERMS USE ========================== */}
          <Flex direction="row" justify="start" items="center">
            <Checkbox
              uncheckedColor={Palette.PrimLight}
              color={Palette.Info}
              status={TOUchecked ? 'checked' : 'unchecked'}
              onPress={() => {
                setTOUChecked(!TOUchecked);
              }}
            />
            <Text
              onPress={() => {
                setTOUChecked(!TOUchecked);
              }}
              style={{
                marginRight: -5,
                fontFamily: KMFont.Medium,
                color: Palette.PrimLight,
              }}
            >
              أوافق على
            </Text>
            <Button
              textColor={Palette.Info}
              compact
              mode="text"
              labelStyle={{
                fontFamily: KMFont.Medium,
                lineHeight: 30,
              }}
              onPress={() => {
                openLink('https://kareemabo3id.github.io/ourcar-TOU/');
              }}
            >
              سياسة الاستخدام والخصوصية
            </Button>
          </Flex>
          {/* TERMS USE ========================== */}
          {/* BUTTONS ========================== */}
          <Flex direction="column" justify="start" items="stretch">
            <Button
              mode="elevated"
              elevation={3}
              buttonColor={Palette.PrimLight}
              textColor={Palette.darkBg}
              style={{ borderRadius: 2000 }}
              labelStyle={{
                fontFamily: KMFont.Medium,
                fontSize: 20,
                lineHeight: 29,
              }}
              onPress={() => {
                userCreactAccount();
              }}
            >
              ابدأ
            </Button>
            <Box pv={2} />
            <Button
              mode="text"
              textColor={Palette.PrimLight}
              style={{ borderRadius: 2000 }}
              labelStyle={{
                fontFamily: KMFont.Medium,
                fontSize: 18,
                lineHeight: 29,
              }}
              onPress={() => go.to('signup')}
            >
              مستخدم جديد؟ انشئ حسابك
            </Button>
            <Button
              mode="text"
              labelStyle={{
                fontFamily: KMFont.Medium,
              }}
              textColor={Palette.PrimLight}
              onPress={() =>
                openLink('https://kareemabo3id.github.io/ourcar-TOU/')
              }
            >
              سياسة الاستخدام والخصوصية
            </Button>
          </Flex>
          {/* BUTTONS ========================== */}
        </Flex>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,

    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  image: {
    resizeMode: 'contain',
    width: width / 1.8,
    height: height * 0.21,
  },
  TextInputStyle: {
    paddingLeft: 10,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  TextInputContentStyle: {
    fontSize: 17.5,
  },
});
