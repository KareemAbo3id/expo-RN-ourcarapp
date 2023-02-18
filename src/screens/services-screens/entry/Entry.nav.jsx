/* eslint-disable no-alert */
import React from 'react';
import { Text, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Font } from '../../../styles/Font.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function EntryNav() {
  // local hooks:
  // eslint-disable-next-line no-unused-vars
  const [userLocation, setUserLocation] = React.useState(null);

  // local handlers:

  // eslint-disable-next-line consistent-return
  const getUserLocation = async () => {
    if (Platform.OS === 'android') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // eslint-disable-next-line no-useless-return
        return alert('الرجاء السماح للتطبيق بالوصول للموقع الحالي');
      }
    }

    const getLocation = await Location.getCurrentPositionAsync({});
    setUserLocation(getLocation);
  };

  React.useEffect(() => {
    getUserLocation();
  }, []);

  // local ui:
  return <Text style={{ fontFamily: Font.cairo }}>الصفحة الرئيسية</Text>;
}
