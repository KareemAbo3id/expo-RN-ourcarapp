/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '../firebase/firebase';
import usePalette from './hooks/usePalette.hook';

// screens:
import Onboard from './start/Onboard.start';
import Home from './start/Home.start';
import Login from './auth/Login.auth';
import Signup from './auth/Signup.auth';
import ResetPassword from './auth/ResetPassword.auth';
import ProfileNav from './screens/Profile.nav';
import NotifyNav from './screens/Notify.nav';
import SettingNav from './screens/Setting.nav';
import AddressNav from './screens/Address.nav';
import CarNav from './screens/Car.nav';
import RouteAppBar from './components/RouteAppBar.component';
import useNav from './hooks/useNav.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const Stack = createNativeStackNavigator();

function AuthNavigation() {
  const [START_APP, SET_START_APP] = useState(true);
  const [INIT_USER, SET_INIT_USER] = useState();

  // local hooks:
  const Palette = usePalette();
  const go = useNav();

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

  const AUTH_SCREENS = [
    { id: 2, view: Login, name: 'login' },
    { id: 3, view: Signup, name: 'signup' },
    { id: 4, view: ResetPassword, name: 'ResetPassword' },
  ];

  // if user not logged in:
  if (!INIT_USER) {
    <Stack.Navigator id={1} initialRouteName="Onboard">
      <Stack.Screen
        name={Onboard}
        component={Onboard}
        options={{ headerShown: false, animation: 'slide_from_left' }}
      />
      {AUTH_SCREENS.map((item) => {
        return (
          <Stack.Screen
            key={item.id}
            name={item.name}
            component={item.view}
            options={{ headerShown: false, animation: 'slide_from_left' }}
          />
        );
      })}
    </Stack.Navigator>;
  }

  // if user logged in:

  const APP_SCREENS = [
    { id: 1, view: NotifyNav, title: 'الاشعارات', name: 'Notify' },
    { id: 2, view: ProfileNav, title: 'الحساب', name: 'Profile' },
    { id: 3, view: AddressNav, title: 'العنوان', name: 'Address' },
    { id: 4, view: CarNav, title: 'السيارة', name: 'Car' },
    { id: 5, view: SettingNav, title: 'الاعدادات', name: 'Setting' },
  ];

  return (
    <Stack.Navigator id={2} initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{ statusBarColor: Palette.Primary, headerShown: false, animation: 'simple_push' }}
      />
      {APP_SCREENS.map((item) => {
        return (
          <Stack.Screen
            key={item.id}
            name={item.name}
            component={item.view}
            options={{
              statusBarColor: Palette.Primary,
              header: () => <RouteAppBar title={item.title} onPress={() => go.to('home')} />,
              animation: 'fade_from_bottom',
            }}
          />
        );
      })}
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
