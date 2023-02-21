/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './config/firebase';
// screens:
import Login from './src/screens/auth-screens/Login.screen';
import Signup from './src/screens/auth-screens/Signup.screen';
import Home from './src/screens/home-screen/Home.screen';
import ForgotPassword from './src/screens/auth-screens/ForgotPassword.screen';
import Onboarding from './src/screens/auth-screens/Onboarding.screen';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const Stack = createNativeStackNavigator();

// react function /////////////////////////
function App() {
  // local hooks:
  const [initApp, setInitApp] = React.useState(true);
  const [initUser, setInitUser] = React.useState();

  // local handlers:
  // user login/logout state changing:
  const LOCALonAuthStateChange = (user) => {
    setInitUser(user);
    if (initApp) setInitApp(false);
  };
  // connect LOCAL AuthStateChange with Firebase AuthStateChange,
  // once when component dismounts:
  useEffect(() => {
    const subscriber = firebase
      .auth()
      .onAuthStateChanged(LOCALonAuthStateChange);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // initApp starts:
  if (initApp) return null;

  // if user not logged in:
  if (!initUser) {
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
          options={{ headerShown: false, animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false, animation: 'slide_from_left' }}
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

export default function AppNavigation() {
  return (
    <NavigationContainer independent>
      <App />
    </NavigationContainer>
  );
}
