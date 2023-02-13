import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebase } from './config/firebase';
// screens:
import Login from './src/screens/auth-screens/Login.screen';
import Signup from './src/screens/auth-screens/Signup.screen';
import Home from './src/screens/home-screen/Home.screen';
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();
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
      <Stack.Navigator>
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
      </Stack.Navigator>
    );
  }

  // if user logged in:
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  const [fontsLoaded] = useFonts({
    cairo: require('./src/assets/fonts/Cairo-Regular.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={Styles.container} onLayout={onLayoutRootView}>
        <App />
      </View>
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
  container: {
    fontFamily: 'cairo',
  },
});
