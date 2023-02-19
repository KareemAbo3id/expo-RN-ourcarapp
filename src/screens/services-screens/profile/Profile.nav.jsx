import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager } from 'react-native';
import { Font } from '../../../styles/Font.style';

// screens
// eslint-disable-next-line import/no-named-as-default
import ProfileRoot from './ProfileRoot';
import CreateAddress from '../../../controllers/CreateAddress.control';
import CreateCar from '../../../controllers/CreateCar.control';
import UpdatePassword from '../../../controllers/UpdatePassword.control';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const Stack = createNativeStackNavigator();

// react function /////////////////////////
export default function ProfileNav() {
  // routes:
  const routes = [
    {
      id: 1,
      name: 'CreateAddress',
      component: CreateAddress,
      title: 'تحديث العنوان',
    },
    {
      id: 2,
      name: 'CreateCar',
      component: CreateCar,
      title: 'اضافة سيارة',
    },
    {
      id: 3,
      name: 'UpdatePassword',
      component: UpdatePassword,
      title: 'تحديث رمز المرور',
    },
  ];

  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="ProfileRoot">
        <Stack.Screen
          name="ProfileRoot"
          component={ProfileRoot}
          options={{ animation: 'slide_from_bottom', headerShown: false }}
        />
        {routes.map((route) => {
          return (
            <Stack.Screen
              key={route.id}
              name={route.name}
              component={route.component}
              options={{
                headerTitle: route.title,
                animation: 'slide_from_bottom',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontFamily: Font.cairo,
                  fontSize: 18,
                },
                headerTransparent: true,
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
