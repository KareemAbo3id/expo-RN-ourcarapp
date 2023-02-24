import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../../firebase/firebase';
import { Flex, Stack } from '@react-native-material/core';
import { TextInput, Button, Text, Switch } from 'react-native-paper';
import {
  validateEmailColor,
  validatePasswordColor,
  validateSignInFormSubmit,
} from '../hooks/useValidation.hook';
// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useLink from '../hooks/useLink.hook';
import TitleAuth from '../components/TitleAuth.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function Login() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // user inputs =============:
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // login handler =============:
  const userLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  // local ui =============:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <KeyboardAvoidingView role="form" behavior="height">
        {/* WELCOME ========================== */}
        <TitleAuth
          title="هلا فيك!"
          describe="تسجيل الدخول"
          source={require('../../assets/images/log-in.png')}
        />
        {/* WELCOME ========================== */}
        <Stack direction="column" justify="center" items="stretch">
          <TextInput
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="E-mail Address"
            value={localEmail}
            onChangeText={(text) => setLocalEmail(text)}
            mode="outlined"
            autoCapitalize="none"
            contextMenuHidden
            cursorColor={validateEmailColor(localEmail)}
            activeOutlineColor={validateEmailColor(localEmail)}
            contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
            style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
            placeholderTextColor={Palette.SecDark}
            outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
          />
          <TextInput
            textContentType="password"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={localPassword}
            onChangeText={(text) => setLocalPassword(text)}
            mode="outlined"
            autoCapitalize="none"
            contextMenuHidden
            cursorColor={validatePasswordColor(localPassword)}
            activeOutlineColor={validatePasswordColor(localPassword)}
            contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
            style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
            placeholderTextColor={Palette.SecDark}
            outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
          />
        </Stack>
        <Flex direction="row" justify="between" items="center" pv={5}>
          <Button
            icon={!showPassword ? 'eye' : 'eye-off'}
            mode="text"
            compact
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.PrimLight,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? 'اظهار رمز المرور' : 'اخفاء رمز المرور'}
          </Button>
          <Button
            mode="text"
            compact
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.Info,
            }}
            onPress={() => go.to('ResetPassword')}
          >
            نسيت رمز المرور؟
          </Button>
        </Flex>
        <Stack direction="column" justify="center" items="stretch">
          <Button
            mode="contained"
            elevation={5}
            buttonColor={Palette.Info}
            textColor={Palette.PrimLight}
            style={{ borderRadius: 1000 }}
            labelStyle={{
              fontFamily: KMFont.Bold,
              fontSize: 17,
              lineHeight: 29,
            }}
            onPress={() => userLogin(localEmail, localPassword)}
            disabled={validateSignInFormSubmit(localEmail, localPassword)}
          >
            دخول
          </Button>
          <Button
            mode="text"
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Regular,
              fontSize: 15,
              lineHeight: 29,
            }}
            onPress={() => go.to('signup')}
          >
            مستخدم جديد؟ انشئ حسابك
          </Button>
          <Button
            mode="text"
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.SecDark,
              fontSize: 12,
            }}
            onPress={() => openLink('https://kareemabo3id.github.io/ourcar-TOU/')}
          >
            سياسة الاستخدام والخصوصية
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
});
