/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {
  Button,
  Text,
  Backdrop,
  BackdropSubheader,
  AppBar,
  Flex,
  TextInput,
  IconButton,
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../config/firebase';
import Palette from '../../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function Home() {
  // local hooks:
  const [userData, setUserData] = React.useState('');
  const [appBarrevealed, setAppBarRevealed] = React.useState(false);

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
      <Backdrop
        headerContainerStyle={{ backgroundColor: Palette.Primary }}
        style={{ backgroundColor: Palette.Primary }}
        revealed={appBarrevealed}
        header={
          <AppBar
            transparent
            leading={(props) => (
              <IconButton
                icon={(props) => (
                  <Icon
                    name={appBarrevealed ? 'close' : 'magnify'}
                    {...props}
                  />
                )}
                onPress={() => setAppBarRevealed((prevState) => !prevState)}
                {...props}
              />
            )}
            trailing={(props) => (
              <IconButton
                icon={(props) => (
                  <Icon
                    name={
                      appBarrevealed
                        ? 'square-edit-outline'
                        : 'square-edit-outline'
                    }
                    {...props}
                  />
                )}
                {...props}
              />
            )}
          />
        }
        backLayer={
          <View style={Styles.backLayerStyles}>
            <TextInput
              leading={(props) => (
                <Icon
                  {...props}
                  name="magnify"
                  size={20}
                  color={Palette.Light}
                />
              )}
              placeholder="Search for car centers..."
              color={Palette.Light}
              variant="standard"
            />
          </View>
        }
      >
        <BackdropSubheader title={`👋 Welcome, ${userData.fullName}`} />
        <Flex justify="center" items="start" direction="column" ph={30} pv={20}>
          <Text>Your e-mail: {userData.email}</Text>
          <Text />
          <Button
            leading={(props) => <Icon name="login" {...props} />}
            onPress={() => {
              firebase.auth().signOut();
            }}
            variant="contained"
            title="logout"
            color={Palette.Primary}
          />
        </Flex>
      </Backdrop>
      <AppBar
        color={Palette.Light}
        variant="bottom"
        trailing={(props) => (
          <IconButton
            icon={(props) => (
              <Icon name={appBarrevealed ? 'account' : 'account'} {...props} />
            )}
            {...props}
          />
        )}
        leading={(props) => (
          <IconButton
            icon={(props) => (
              <Icon name={appBarrevealed ? 'home' : 'home'} {...props} />
            )}
            {...props}
          />
        )}
      />
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backLayerStyles: {
    backgroundColor: Palette.Primary,
    height: 70,
    paddingHorizontal: 12,
  },
});
