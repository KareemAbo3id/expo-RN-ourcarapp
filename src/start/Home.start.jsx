import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Flex } from '@react-native-material/core';
import { Text, Button } from 'react-native-paper';
import { firebase } from '../../../config/firebase';

// screens =============:
import EntryNav from '../screens/services-screens/entry/Entry.nav';
import MapNav from '../screens/services-screens/map/Maps.nav';
import ShopNav from '../screens/services-screens/shop/Shop.nav';
import ProfileNav from '../screens/services-screens/profile/Profile.nav';

// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
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
  const go = useNav();

  const Palette = usePalette();

  // local hooks =============:
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;

  // local ui:

  return (
    <SafeAreaView
      style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}
    >
      <StatusBar backgroundColor={Palette.darkBg} />
      {isCurrentUserVerified ? (
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
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Flex direction="column" items="center" justify="center" pt={50}>
          <MaterialCommunityIcons
            name="email-check"
            size={60}
            color={Palette.Primary}
          />
          <Text
            style={{
              fontFamily: KMFont.Medium,
              paddingTop: 20,
              textAlign: 'center',
            }}
            variant="bodyMedium"
          >
            تم ارسال رابط تفعيل الحساب الى بريدك الالكتروني
          </Text>
          <Text
            style={{
              fontFamily: KMFont.Medium,
              textAlign: 'center',
            }}
            variant="bodyMedium"
          >
            الرجاء تفعيل الحساب
          </Text>
          <Box pt={20}>
            {/* 3 LOGIN BUTTON ================================ */}
            <Button
              mode="elevated"
              elevation={3}
              buttonColor={Palette.PrimLight}
              textColor={Palette.darkBg}
              style={{ borderRadius: 2000 }}
              labelStyle={{
                fontFamily: KMFont.Medium,
                fontSize: 20,
                lineHeight: 29,
              }}
              onPress={() => {
                go.to('login');
              }}
            >
              سجل دخولك الان
            </Button>
          </Box>
          <Text
            style={{
              fontFamily: KMFont.Medium,
              paddingTop: 20,
              textAlign: 'center',
              color: Palette.DarkSecondary,
            }}
            variant="bodySmall"
          >
            تحقق من صندوق الرسائل غير المرغوب فيها او spam
          </Text>
          <Text
            style={{
              fontFamily: KMFont.Medium,
              textAlign: 'center',
              color: Palette.DarkSecondary,
            }}
            variant="bodySmall"
          >
            ذلك لأن النسخة مازلت تجريبية
          </Text>
        </Flex>
      )}
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    height: '100%',
  },
});
