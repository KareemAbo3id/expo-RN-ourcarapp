/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// screens =============:
import MainNav from '../screens/main/Main.nav';
import MapNav from '../screens/maps/Maps.nav';
import StoreNav from '../screens/store/Store.nav';
import ProfileNav from '../screens/profile/Profile.nav';

// hooks:
import usePalette from '../hooks/usePalette.hook';

// imports ////////////////////////////////

const Tab = createBottomTabNavigator();
const screenNames = {
  Entry: 'Entry',
  Maps: 'Map',
  Shop: 'Shop',
  Profile: 'Profile',
};

// react function /////////////////////////
export default function Home() {
  // local hooks =============:
  const Palette = usePalette();

  // local ui:

  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />

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
              } else if (rn === screenNames.Maps) {
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
          <Tab.Screen name="Entry" component={MainNav} getId={1} options={{ headerShown: false }} />
          <Tab.Screen name="Map" component={MapNav} getId={2} options={{ headerShown: false }} />
          <Tab.Screen name="Shop" component={StoreNav} getId={3} options={{ headerShown: false }} />
          <Tab.Screen
            name="Profile"
            component={ProfileNav}
            getId={4}
            options={{ headerShown: false }}
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
