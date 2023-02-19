/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable global-require */
/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Flex } from '@react-native-material/core';
import { Avatar, Text } from 'react-native-paper';
import { firebase } from '../../../config/firebase';

// screens =============:
import EntryNav from '../services-screens/entry/Entry.nav';
import MapNav from '../services-screens/map/Maps.nav';
import ShopNav from '../services-screens/shop/Shop.nav';
import ProfileNav from '../services-screens/profile/Profile.nav';
import Palette from '../../styles/Colors.style';
import { Font } from '../../styles/Font.style';

const screenNames = {
  Entry: 'Entry',
  Map: 'Map',
  Shop: 'Shop',
  Profile: 'Profile',
};
// imports ////////////////////////////////

const Tab = createBottomTabNavigator();

// react function /////////////////////////
export default function Home() {
  // local hooks =============:
  const { currentUser } = firebase.auth();
  const [currentUserData, setCurrentUserData] = React.useState('');

  // Get current user data =============:
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setCurrentUserData(snapshot.data());
        } else {
          console.log('user does not exist');
        }
      });
  }, []);

  // local ui:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <StatusBar backgroundColor={Palette.DarkPrimary} />
      <NavigationContainer independent>
        <Tab.Navigator
          id={2}
          initialRouteName={screenNames.Entry}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              const rn = route.name;

              if (rn === screenNames.Entry) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === screenNames.Map) {
                iconName = focused ? 'map' : 'map-outline';
              } else if (rn === screenNames.Shop) {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (rn === screenNames.Profile) {
                iconName = focused ? 'account' : 'account-outline';
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={focused ? 30 : 24}
                  color={focused ? Palette.Primary : Palette.Secondary}
                />
              );
            },
            tabBarShowLabel: false,
            tabBarStyle: { height: 60 },
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen
            name="Entry"
            component={EntryNav}
            getId={1}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Map"
            component={MapNav}
            getId={2}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopNav}
            getId={3}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNav}
            getId={4}
            options={{
              headerShown: true,
              headerStyle: {
                height: Dimensions.get('screen').height / 5.8,
                backgroundColor: Palette.Primary,
              },
              headerTitleAlign: 'center',
              headerTitle: () => {
                return (
                  <Flex direction="column" items="center" justify="center">
                    <Box pb={10}>
                      <Avatar.Image
                        size={40}
                        source={require('../../assets/images/avatar-placeholder.png')}
                      />
                    </Box>
                    <Text
                      style={{ color: Palette.White, fontFamily: Font.cairo }}
                      variant="headlineSmall"
                    >
                      {!currentUserData?.name ? '...' : currentUserData?.name}
                    </Text>
                    <Text
                      style={{
                        color: Palette.White,
                        fontFamily: Font.cairo,
                        backgroundColor: Palette.DarkPrimary,
                        borderRadius: 500,
                        paddingHorizontal: 10,
                        lineHeight: 25,
                      }}
                      variant="bodySmall"
                    >
                      {!currentUserData?.email ? '...' : currentUserData?.email}
                    </Text>
                  </Flex>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
