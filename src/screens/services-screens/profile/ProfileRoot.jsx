/* eslint-disable react-native/no-raw-text */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, I18nManager, RefreshControl } from 'react-native';
import { Text, List, Divider, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Flex, Box, Wrap } from '@react-native-material/core';
import { firebase } from '../../../../config/firebase';
import TOU from '../../../components/TOU.component';
import Version from '../../../components/Version.component';
import Palette from '../../../styles/Colors.style';
import { Font } from '../../../styles/Font.style';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function ProfileRoot() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);
  const [refreshing, setRefreshing] = React.useState(false);
  const { currentUser } = firebase.auth();
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;
  const [currentUserData, setCurrentUserData] = React.useState('');

  const getData = () => {
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
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  // local handler =============:
  React.useEffect(() => {
    getData();
  }, []);

  // Local ui =============:
  return (
    <Box>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Email Verified */}
        {!isCurrentUserVerified ? (
          <Text
            style={{
              color: Palette.Black,
              fontFamily: Font.cairo,
              textAlign: 'center',
              backgroundColor: Palette.Warning,
              paddingVertical: 15,
            }}
            variant="bodyMedium"
          >
            تم ارسال رابط تفعيل الحساب الى بريدك الالكتروني
          </Text>
        ) : null}
        {/* =================== */}

        {isCurrentUserVerified ? (
          <Flex justify="center" items="stretch" direction="column" ph={20}>
            <List.Section>
              <List.Subheader style={{ fontFamily: Font.cairo }}>
                العناوين
              </List.Subheader>
              <Card
                style={{
                  backgroundColor: Palette.White,
                  borderColor: Palette.Light,
                  borderWidth: 1,
                }}
                mode="contained"
              >
                <Card.Content>
                  <Wrap direction="row" justify="start" items="center">
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={15}
                      color={Palette.DarkGray}
                    />
                    <Text style={{ paddingLeft: 5, paddingRight: 2 }} />
                    <Text
                      variant="bodyMedium"
                      style={{
                        fontFamily: Font.cairo,
                        color: Palette.DarkGray,
                      }}
                    >
                      {currentUserData?.userAddress?.reg}
                    </Text>
                    <Text style={{ paddingLeft: 5, paddingRight: 2 }}>،</Text>
                    <Text
                      variant="bodyMedium"
                      style={{
                        fontFamily: Font.cairo,
                        color: Palette.DarkGray,
                      }}
                    >
                      {currentUserData?.userAddress?.city}
                    </Text>
                    <Text style={{ paddingLeft: 5, paddingRight: 2 }}>،</Text>
                    <Text
                      variant="bodyMedium"
                      style={{
                        fontFamily: Font.cairo,
                        color: Palette.DarkGray,
                      }}
                    >
                      {currentUserData?.userAddress?.dis}
                    </Text>
                  </Wrap>
                </Card.Content>
              </Card>

              <List.Item
                titleStyle={{
                  color: Palette.Primary,
                  fontFamily: Font.cairo,
                }}
                onPress={() => {
                  goTo('CreateAddress');
                }}
                title="تحديث العنوان"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="pencil-box"
                    color={Palette.Primary}
                  />
                )}
              />
            </List.Section>
            <List.Section>
              <List.Subheader style={{ fontFamily: Font.cairo }}>
                السيارات
              </List.Subheader>

              <List.Item
                titleStyle={{
                  color: Palette.Primary,
                  fontFamily: Font.cairo,
                }}
                onPress={() => {
                  goTo('CreateCar');
                }}
                title="اضافة سيارة"
                left={(props) => (
                  <List.Icon {...props} icon="car" color={Palette.Primary} />
                )}
              />
            </List.Section>
            <List.Section>
              <List.Subheader style={{ fontFamily: Font.cairo }}>
                الاعدادات
              </List.Subheader>
              <List.Item
                titleStyle={{ color: Palette.Primary, fontFamily: Font.cairo }}
                onPress={() => {
                  goTo('UpdatePassword');
                }}
                title="تحديث رمز المرور"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="lock-reset"
                    color={Palette.Primary}
                  />
                )}
              />
              <List.Item
                titleStyle={{ color: Palette.Error, fontFamily: Font.cairo }}
                onPress={() => {
                  firebase.auth().signOut();
                }}
                title="تسجيل خروج"
                left={(props) => (
                  <List.Icon {...props} icon="logout" color={Palette.Error} />
                )}
              />
            </List.Section>
          </Flex>
        ) : (
          <Flex
            justify="center"
            items="stretch"
            direction="column"
            pt={15}
            ph={25}
          >
            <List.Section>
              <List.Subheader
                style={{
                  fontFamily: Font.cairo,
                  color: Palette.Secondary,
                }}
              >
                قم بتفعيل حسابك لتمكين الاعدادات
              </List.Subheader>
              <List.Item
                titleStyle={{ color: Palette.Error, fontFamily: Font.cairo }}
                onPress={() => {
                  firebase.auth().signOut();
                }}
                title="تسجيل خروج"
                left={(props) => (
                  <List.Icon {...props} icon="logout" color={Palette.Error} />
                )}
              />
            </List.Section>
          </Flex>
        )}
        <Divider />
        <TOU />
        <Version />
      </ScrollView>
    </Box>
  );
}
