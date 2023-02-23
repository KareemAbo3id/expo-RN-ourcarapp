import React, { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '../config/firebase';

// screens:
import Onboarding from './screens/auth-screens/Onboarding.screen';
import Login from './screens/auth-screens/Login.screen';
import Signup from './screens/auth-screens/Signup.screen';
import ForgotPassword from './screens/auth-screens/ForgotPassword.screen';
import Home from './screens/home-screen/Home.screen';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const Stack = createNativeStackNavigator();

function AuthNavigation() {
  const [START_APP, SET_START_APP] = useState(true);
  const [INIT_USER, SET_INIT_USER] = useState();

  // local handlers:
  const LOCAL_AUTH = (user) => {
    SET_INIT_USER(user);
    if (START_APP) SET_START_APP(false);
  };

  // check the user auth:
  useEffect(() => {
    const FIREBASE_AUTH = firebase.auth().onAuthStateChanged(LOCAL_AUTH);
    return FIREBASE_AUTH;
  }, []);

  // start app:
  if (START_APP) return null;

  // if user not logged in:
  if (!INIT_USER) {
    return (
      <Stack.Navigator id={1} initialRouteName="onboarding">
        <Stack.Screen
          name="onboarding"
          component={Onboarding}
          options={{ headerShown: false, animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    );
  }

  // if user logged in:
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false, animation: 'flip' }}
      />
    </Stack.Navigator>
  );
}

export default function Root() {
  return (
    <NavigationContainer independent>
      <AuthNavigation />
    </NavigationContainer>
  );
}
