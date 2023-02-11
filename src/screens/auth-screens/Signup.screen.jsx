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
export default function Signup() {
  // local hooks =============:
  const NavigationTo = useNavigation();
  const [createEmail, setCreateEmail] = React.useState('');
  const [createPassword, setCreatePassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // local handlers =============:
  // creact account handler:
  const userCreactAccount = async () => {};

  // validations:
  const changeCreateEmailColor = () => {
    if (
      (EmailValidator.validate(createEmail) && createEmail !== '') ||
      createEmail >= 0
    ) {
      return Palette.Primary;
    } else return Palette.Error;
  };
  const changeCreateEmailIcon = () => {
    if (
      (EmailValidator.validate(createEmail) && createEmail !== '') ||
      createEmail >= 0
    ) {
      return 'email-outline';
    } else return 'email-alert-outline';
  };
  const changeCreatePasswordColor = () => {
    if (createPassword.length >= 6 || createPassword >= 0) {
      return Palette.Primary;
    } else return Palette.Error;
  };
  const changeCreatePasswordIcon = () => {
    if (createPassword.length >= 6 || createPassword >= 0) {
      return 'lock-outline';
    } else return 'lock-alert-outline';
  };
  const changeConfirmedPasswordColor = () => {
    if (confirmPassword === createPassword || confirmPassword >= 0) {
      return Palette.Primary;
    } else return Palette.Error;
  };
  const changeConfirmedPasswordIcon = () => {
    if (confirmPassword === createPassword || confirmPassword >= 0) {
      return 'lock-check-outline';
    } else return 'lock-alert-outline';
  };
  const formValidateForCreateAccBtnDisable = () => {
    if (
      createEmail !== '' &&
      confirmPassword !== '' &&
      createPassword !== '' &&
      createPassword.length >= 6
    ) {
      return false;
    } else return true;
  };

  // local ui  =============:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <KeyboardAvoidingView>
        <LogoAvatar />
        <ScreenTitle title="Login" />
        <Stack spacing={5}>
          <Box>
            {/* 1 CREATE EMAIL INPUT ============================= */}
            <TextInput
              leading={(props) => (
                <Icon
                  name={changeCreateEmailIcon()}
                  {...props}
                  size={20}
                  color={changeCreateEmailColor()}
                />
              )}
              value={createEmail}
              onChangeText={(text) => setCreateEmail(text)}
              color={changeCreateEmailColor()}
              label="New E-mail"
              textContentType="emailAddress"
              variant="outlined"
            />
          </Box>
          <Box>
            {/* 2 CREATE PASSWORD INPUT ========================== */}
            <TextInput
              leading={(props) => (
                <Icon
                  name={changeCreatePasswordIcon()}
                  {...props}
                  size={20}
                  color={changeCreatePasswordColor()}
                />
              )}
              value={createPassword}
              onChangeText={(text) => setCreatePassword(text)}
              color={changeCreatePasswordColor()}
              label="New Password"
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
          <Box>
            {/* 3 CONFIRM PASSWORD INPUT ========================== */}
            <TextInput
              leading={(props) => (
                <Icon
                  name={changeConfirmedPasswordIcon()}
                  {...props}
                  size={20}
                  color={changeConfirmedPasswordColor()}
                />
              )}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              color={changeConfirmedPasswordColor()}
              label="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              textContentType="password"
              variant="outlined"
              trailing={(props) => (
                <IconButton
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  icon={(props) =>
                    showConfirmPassword ? (
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
            {/* 4 CREATE ACCOUNT BUTTON ================================ */}
            <Button
              leading={(props) => <Icon name="account-plus" {...props} />}
              onPress={userCreactAccount}
              variant="contained"
              title="Create Account"
              disabled={formValidateForCreateAccBtnDisable()}
              color={Palette.Primary}
            />
          </Box>
          <Flex items="center" justify="start" direction="column">
            {/* NAV BUTTON ================================ */}
            <Button
              leading={(props) => <Icon name="login" {...props} />}
              onPress={() => {
                NavigationTo.navigate('login');
              }}
              variant="text"
              color={Palette.Primary}
              uppercase={false}
              title="Already have an account? Login"
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
