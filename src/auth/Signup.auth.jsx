import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { firebase } from '../../firebase/firebase';
import { Box, Divider, Flex, Stack } from '@react-native-material/core';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import carMake from '../../data/carMake';
import carModel from '../../data/carModel';
import carYear from '../../data/carYear';
import cit from '../../data/cit';
import reg from '../../data/reg';
import {
  validateNameColor,
  validateEmailColor,
  validatePasswordColor,
} from '../hooks/useValidation.hook';
// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useLink from '../hooks/useLink.hook';
import TitleAuth from '../components/TitleAuth.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  nextCarValid,
  nextEmailValid,
  nextNameValid,
  nextPassValid,
} from '../hooks/CheckerSignup.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function Signup() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // local hooks =============:
  const [localFName, setLocalFName] = useState('');
  const [localLName, setLocalLName] = useState('');

  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [TOUchecked, setTOUChecked] = useState(false);

  const [localMake, setLocalMake] = useState('');
  const [loaclModel, setLocalModel] = useState('');
  const [localYear, setLocalYear] = useState('');

  const [localReg, setLocalReg] = useState('');
  const [loaclCity, setLocalCity] = useState('');
  const [localDis, setLocalDis] = useState('');

  // signup steps =============:
  const [nameStep, setNameStep] = useState(true);
  const [emailStep, setEmailStep] = useState(false);
  const [passStep, setpassStep] = useState(false);
  const [TOUStep, setTOUStep] = useState(false);
  const [carStep, setCarStep] = useState(false);
  const [addressStep, setAddressStep] = useState(false);

  const [nameStepIcon, setNameStepIcon] = useState('account');
  const [emailStepIcon, setEmailStepIcon] = useState('email');
  const [passStepIcon, setpassStepIcon] = useState('lock');
  const [TOUStepIcon, setTOUStepIcon] = useState('checkbox-marked');
  const [carStepIcon, setCarStepIcon] = useState('car');
  const [addressStepIcon, setAddressStepIcon] = useState('map-marker');

  const [finishAll, setFinishAll] = useState(false);

  // reset sign up info handler =============:
  const resetSignUpForm = () => {
    setLocalFName('');
    setLocalLName('');
    setLocalEmail('');
    setLocalPassword('');
    setConPassword('');
    setTOUChecked(false);
    setLocalMake('');
    setLocalModel('');
    setLocalYear('');
    setLocalReg('');
    setLocalCity('');
    setLocalDis('');
    setNameStep(true);
    setEmailStep(false);
    setpassStep(false);
    setTOUStep(false);
    setCarStep(false);
    setAddressStep(false);
    setNameStepIcon('account');
    setEmailStepIcon('email');
    setpassStepIcon('lock');
    setTOUStepIcon('checkbox-marked');
    setCarStepIcon('car');
    setAddressStepIcon('map-marker');
    setFinishAll(false);
  };

  // Creact Account handler =============:
  const userCreactAccount = async (
    userFname,
    userLname,
    userEmail,
    userPassword,
    userMake,
    userModel,
    userYear,
    userReg,
    userCity,
    userDis
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://ourcarapp-4330e.firebaseapp.com/',
          })
          .then(() => {
            alert('???? ?????????? ???????? ?????????? ???????????? ?????? ?????????? ????????????????????');
          })
          .catch(() => {
            alert('?????? ?????? ???????????? ???????? ?????? ????????');
          })
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              userContact: {
                userFname,
                userLname,
                userEmail,
              },
              userCar: {
                userMake,
                userModel,
                userYear,
              },
              userAddress: {
                userReg,
                userCity,
                userDis,
              },
            });
          })
          .catch(() => {
            alert('?????? ?????? ???????????? ???????? ?????? ????????');
          });
      })
      .catch(() => {
        alert('???????????? ???????????????????? ???????????? ???????? ????????????');
      });
  };

  // local ui =============:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <KeyboardAvoidingView role="form" behavior="height">
        {/* WELCOME ========================== */}
        <TitleAuth
          title="????????????!"
          describe={
            !finishAll ? '???????? ???????????????? ???????????????? ???????????? ??????????' : '???????? ???? ?????????????? ???? ???????? ??????????'
          }
          source={require('../../assets/images/sign-up.png')}
        />

        {/* STEPS ========================== */}
        <Stack direction="row" justify="between" items="center" ph={10} pb={8}>
          <MaterialCommunityIcons
            name={nameStepIcon}
            color={nameStepIcon === 'account' ? Palette.SecDark : Palette.Info}
            size={17}
          />
          <MaterialCommunityIcons
            name={emailStepIcon}
            color={emailStepIcon === 'email' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={passStepIcon}
            color={passStepIcon === 'lock' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={TOUStepIcon}
            color={TOUStepIcon === 'checkbox-marked' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={carStepIcon}
            color={carStepIcon === 'car' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={addressStepIcon}
            color={addressStepIcon === 'map-marker' ? Palette.SecDark : Palette.Info}
            size={18}
          />
        </Stack>

        {/* STEP TITLE ========================== */}
        <Stack direction="row" justify="center" items="center" ph={10} pb={8}>
          {nameStep && (
            <Text
              style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecLight }}
              variant="bodyLarge"
            >
              ???????? ????????
            </Text>
          )}
          {emailStep && (
            <Text
              style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecLight }}
              variant="bodyLarge"
            >
              ???????? ?????????? ????????????????????
            </Text>
          )}
          {passStep && (
            <Text
              style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecLight }}
              variant="bodyLarge"
            >
              ???????? ?????? ????????????
            </Text>
          )}
          {carStep && (
            <Text
              style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecLight }}
              variant="bodyLarge"
            >
              ???????? ???????????? ????????????
            </Text>
          )}
          {addressStep && (
            <Text
              style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecLight }}
              variant="bodyLarge"
            >
              ???????? ????????????
            </Text>
          )}
        </Stack>

        {/* FORM ========================== */}
        <Stack direction="column" justify="center" items="stretch">
          {nameStep && (
            <View>
              {/* First Name */}
              <TextInput
                keyboardType="default"
                textContentType="none"
                placeholder="First Name"
                value={localFName}
                onChangeText={(name) => setLocalFName(name)}
                mode="outlined"
                contextMenuHidden
                cursorColor={validateNameColor(localFName)}
                activeOutlineColor={validateNameColor(localFName)}
                contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              {/* Last Name */}
              <TextInput
                keyboardType="default"
                textContentType="none"
                placeholder="Last Name"
                value={localLName}
                onChangeText={(name) => setLocalLName(name)}
                mode="outlined"
                contextMenuHidden
                cursorColor={validateNameColor(localLName)}
                activeOutlineColor={validateNameColor(localLName)}
                contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              {/* NEXT NAME */}
              <Button
                mode="contained"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextNameValid(localFName, localLName)}
                onPress={() => {
                  setNameStep(false);
                  setEmailStep(true);
                  setNameStepIcon('check-decagram');
                }}
              >
                ????????????
              </Button>
            </View>
          )}
          {/* Email */}
          {emailStep && (
            <View>
              <TextInput
                keyboardType="email-address"
                textContentType="none"
                placeholder="New E-mail Address"
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
              {/* NEXT EMAIL */}
              <Button
                mode="contained"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextEmailValid(localEmail)}
                onPress={() => {
                  setEmailStep(false);
                  setpassStep(true);
                  setEmailStepIcon('check-decagram');
                }}
              >
                ????????????
              </Button>
            </View>
          )}
          {passStep && (
            <View>
              {/* Password */}
              <TextInput
                textContentType="password"
                placeholder="New Password"
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
              {/* Re Password */}
              <TextInput
                textContentType="password"
                placeholder="Re-type Password"
                secureTextEntry={!showPassword}
                value={conPassword}
                onChangeText={(text) => setConPassword(text)}
                mode="outlined"
                autoCapitalize="none"
                contextMenuHidden
                cursorColor={validatePasswordColor(conPassword)}
                activeOutlineColor={validatePasswordColor(conPassword)}
                contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              <Flex direction="row" justify="between" items="center" pv={5}>
                {/* Show / Hide Pass */}
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
                  {!showPassword ? '?????????? ?????? ????????????' : '?????????? ?????? ????????????'}
                </Button>
              </Flex>
              {/* NEXT PASSWORD */}
              <Button
                mode="contained"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextPassValid(conPassword, localPassword)}
                onPress={() => {
                  setpassStep(false);
                  setTOUStep(true);
                  setpassStepIcon('check-decagram');
                }}
              >
                ????????????
              </Button>
            </View>
          )}
        </Stack>
        {/* TOUchecked */}
        {TOUStep && (
          <View>
            <Flex direction="row" justify="between" items="center" pv={5}>
              <Button
                icon={!TOUchecked ? 'checkbox-blank-outline' : 'checkbox-marked-outline'}
                mode="text"
                compact
                labelStyle={{
                  fontFamily: KMFont.Regular,
                  color: Palette.PrimLight,
                }}
                onPress={() => setTOUChecked(!TOUchecked)}
              >
                ?????????? ?????? ?????????? ?????????????????? ??????????????????
              </Button>
            </Flex>
            {/* NEXT TOUchecked */}
            <Button
              mode="contained"
              elevation={5}
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={!TOUchecked ? true : false}
              onPress={() => {
                setTOUStep(false);
                setCarStep(true);
                setTOUStepIcon('check-decagram');
              }}
            >
              ????????????
            </Button>
          </View>
        )}
        {/* CAR DATA */}
        {carStep && (
          <Stack direction="column" justify="center" items="stretch" spacing={8} pb={5}>
            <Box>
              <SelectList
                setSelected={setLocalMake}
                data={carMake}
                fontFamily={KMFont.Regular}
                search={false}
                dropdownStyles={[
                  { backgroundColor: Palette.PrimLight, zIndex: 22 },
                  Styles.dropdownStyles,
                ]}
                boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                placeholder="????????????"
                arrowicon={
                  <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                }
              />
            </Box>
            {localMake && (
              <Box>
                <SelectList
                  setSelected={setLocalModel}
                  data={carModel[localMake]}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[
                    { backgroundColor: Palette.PrimLight, zIndex: 22 },
                    Styles.dropdownStyles,
                  ]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  placeholder="??????????????"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {loaclModel && (
              <Box>
                <SelectList
                  setSelected={setLocalYear}
                  data={carYear}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[
                    { backgroundColor: Palette.PrimLight, zIndex: 22 },
                    Styles.dropdownStyles,
                  ]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  placeholder="??????????"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {/* NEXT CAR DATA */}
            <Button
              mode="contained"
              elevation={5}
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={nextCarValid(localMake, loaclModel, localYear)}
              onPress={() => {
                setCarStep(false);
                setAddressStep(true);
                setCarStepIcon('check-decagram');
              }}
            >
              ????????????
            </Button>
          </Stack>
        )}
        {/* Address Data */}
        {addressStep && (
          <Stack direction="column" justify="center" items="stretch" spacing={8} pb={5}>
            <Box>
              <SelectList
                setSelected={setLocalReg}
                data={reg}
                fontFamily={KMFont.Regular}
                search={false}
                dropdownStyles={[
                  { backgroundColor: Palette.PrimLight, zIndex: 22 },
                  Styles.dropdownStyles,
                ]}
                boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                placeholder="??????????????"
                arrowicon={
                  <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                }
              />
            </Box>
            {localReg && (
              <Box>
                <SelectList
                  setSelected={setLocalCity}
                  data={cit[localReg]}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[
                    { backgroundColor: Palette.PrimLight, zIndex: 22 },
                    Styles.dropdownStyles,
                  ]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  placeholder="??????????????"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {loaclCity && (
              <Box>
                <TextInput
                  keyboardType="default"
                  textContentType="none"
                  placeholder="????????"
                  value={localDis}
                  onChangeText={(name) => setLocalDis(name)}
                  mode="outlined"
                  contextMenuHidden
                  cursorColor={validateNameColor(localDis)}
                  activeOutlineColor={validateNameColor(localDis)}
                  contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                  style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
                  placeholderTextColor={Palette.SecDark}
                  outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
                />
              </Box>
            )}
            {/* NEXT ADDRESS DATA */}
            <Button
              mode="contained"
              elevation={5}
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={nextCarValid(localReg, loaclCity, localDis)}
              onPress={() => {
                setAddressStep(false);
                setFinishAll(true);
                setAddressStepIcon('check-decagram');
              }}
            >
              ????????????
            </Button>
          </Stack>
        )}
        {/* SIGN UP BUTTON */}
        <Stack direction="column" justify="center" items="stretch" pt={10}>
          {finishAll && (
            <View>
              <Card
                style={{ borderRadius: 15, backgroundColor: Palette.Primary, marginBottom: 30 }}
                elevation={5}
              >
                <Card.Content>
                  <Text
                    variant="headlineSmall"
                    style={{ fontFamily: KMFont.Bold, color: Palette.PrimLight }}
                  >
                    {`???? ???????????? ${localFName} ${localLName}`}
                  </Text>
                  <Divider color={Palette.PrimLight} style={{ marginVertical: 8, opacity: 0.4 }} />
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Regular, color: Palette.PrimLight }}
                  >
                    {`???? ??????????????: ${localEmail}`}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Regular, color: Palette.PrimLight }}
                  >
                    {`???? ??????????????: ${localMake} ${loaclModel} ${localYear}`}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Regular, color: Palette.PrimLight }}
                  >
                    {`??????? ??????????????: ${loaclCity} - ${localDis}`}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    mode="contained"
                    containerColor={Palette.Red}
                    icon="delete"
                    iconColor={Palette.PrimLight}
                    onPress={() => {
                      resetSignUpForm();
                    }}
                  />
                </Card.Actions>
              </Card>
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
                onPress={() =>
                  userCreactAccount(
                    localFName,
                    localLName,
                    localEmail,
                    localPassword,
                    localMake,
                    loaclModel,
                    localYear,
                    localReg,
                    loaclCity,
                    localDis
                  )
                }
              >
                ??????????
              </Button>
            </View>
          )}
          <Button
            mode="text"
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Regular,
              fontSize: 15,
              lineHeight: 29,
            }}
            onPress={() => go.to('login')}
          >
            ???????? ???????? ?????????? ?????? ??????????
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
            ?????????? ?????????????????? ??????????????????
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
  dropdownStyles: {
    borderWidth: 0,
    position: 'absolute',
    marginTop: 55,
    width: '100%',
    elevation: 10,
    borderRadius: 15,
  },
  boxStyles: {
    borderWidth: 0,
    borderRadius: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
