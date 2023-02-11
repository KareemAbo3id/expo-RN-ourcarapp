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
import {
  Button,
  IconButton,
  TextInput,
  Flex,
  Box,
  Stack,
} from '@react-native-material/core';
import * as EmailValidator from 'email-validator';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import LogoAvatar from '../../components/LogoAvatar.component';
import ScreenTitle from '../../components/ScreenTitle.component';
import { firebase } from '../../../config/firebase';
import Palette from '../../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function Login() {
  // local hooks =============:
  const NavigationTo = useNavigation();
  const [logEmail, setLogEmail] = React.useState('');
  const [logPassword, setLogPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // local handlers =============:
  // login handler:
  const userLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  // validations:

  const changeLogEmailColor = () => {
    if (
      EmailValidator.validate(logEmail) &&
      logEmail.toString() !== '' &&
      logEmail.toString().length >= 0
    ) {
      return Palette.Primary;
    } else return Palette.Error;
  };
  const changeLogEmailIcon = () => {
    if (
      EmailValidator.validate(logEmail) &&
      logEmail.toString() !== '' &&
      logEmail.toString().length >= 0
    ) {
      return 'email-outline';
    } else return 'email-alert-outline';
  };
  const changeLogPasswordColor = () => {
    if (logPassword.toString() !== '' && logPassword.toString().length >= 6) {
      return Palette.Primary;
    } else return Palette.Error;
  };
  const changeLogPasswordIcon = () => {
    if (logPassword.toString() !== '' && logPassword.toString().length >= 6) {
      return 'lock-outline';
    } else return 'lock-alert-outline';
  };
  const formValidateForLogBtnDisable = () => {
    if (
      EmailValidator.validate(logEmail) &&
      logEmail.toString() !== '' &&
      logPassword.toString() !== '' &&
      logPassword.toString().length >= 6
    ) {
      return false;
    } else return true;
  };

  // local ui =============:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <LogoAvatar />
        <ScreenTitle title="Login" />
        <Stack spacing={5}>
          <Box>
            {/* 1 LOG EMAIL INPUT ============================= */}
            <TextInput
              leading={(props) => (
                <Icon
                  name={changeLogEmailIcon()}
                  {...props}
                  size={20}
                  color={changeLogEmailColor()}
                />
              )}
              value={logEmail}
              onChangeText={(text) => setLogEmail(text)}
              color={changeLogEmailColor()}
              label="E-mail"
              autoCapitalize="none"
              placeholder="e.g: johndoe@example.com"
              autoCorrect={false}
              textContentType="emailAddress"
              keyboardType="email-address"
              variant="outlined"
            />
          </Box>
          <Box>
            {/* 2 LOG PASSWORD INPUT ========================== */}
            <TextInput
              leading={(props) => (
                <Icon
                  name={changeLogPasswordIcon()}
                  {...props}
                  size={20}
                  color={changeLogPasswordColor()}
                />
              )}
              value={logPassword}
              onChangeText={(password) => setLogPassword(password)}
              color={changeLogPasswordColor()}
              label="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              textContentType="password"
              variant="outlined"
              trailing={(props) => (
                <IconButton
                  onPress={() => setShowPassword(!showPassword)}
                  icon={(props) =>
                    showPassword ? (
                      <Icon
                        name="eye"
                        {...props}
                        color={Palette.Primary}
                        size={20}
                      />
                    ) : (
                      <Icon name="eye-off" {...props} size={20} />
                    )
                  }
                  {...props}
                />
              )}
            />
          </Box>
          <Box pt={10} pb={10}>
            {/* 3 LOGIN BUTTON ================================ */}
            <Button
              leading={(props) => <Icon name="login" {...props} />}
              onPress={() => {
                userLogin(logEmail, logPassword);
              }}
              variant="contained"
              title="login"
              disabled={formValidateForLogBtnDisable()}
              color={Palette.Primary}
            />
          </Box>
          <Flex items="center" justify="start" direction="column">
            {/* NAV BUTTON ================================ */}
            <Button
              leading={(props) => (
                <Icon name="account-plus-outline" {...props} />
              )}
              onPress={() => {
                NavigationTo.navigate('signup');
              }}
              variant="text"
              color={Palette.Primary}
              uppercase={false}
              title="Don't have an account? Create one"
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
    flex: 1,
    backgroundColor: Palette.Primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
