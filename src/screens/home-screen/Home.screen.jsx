/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { Button } from '@react-native-material/core';
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../config/firebase';
import Palette from '../../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function Home() {
  // local hooks:
  const [userData, setUserData] = React.useState('');

  // local handlers:
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        } else {
          console.log('user does not exist');
        }
      });
  }, []);

  // local ui:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <Text>👋 Hello, {userData.fullName}</Text>
      <Text>👉 logged in as: {userData.email}</Text>

      <Button
        leading={(props) => <Icon name="login" {...props} />}
        onPress={() => {
          firebase.auth().signOut();
        }}
        variant="contained"
        title="logout"
        color={Palette.Primary}
      />
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
