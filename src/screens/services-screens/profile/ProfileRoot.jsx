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
import { ScrollView, I18nManager } from 'react-native';
import { Text, List, Divider, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Flex, Box } from '@react-native-material/core';
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
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;

  // Local ui =============:
  return (
    <Box>
      <ScrollView>
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
              {/* {carsList.length < 1 ? null : (
                <View>
                  {carsList.map((car, index) => {
                    return <Text key={index}>{car}</Text>;
                  })}
                </View>
              )} */}
              <Card
                style={{
                  backgroundColor: Palette.White,
                  borderColor: Palette.Light,
                  borderWidth: 1,
                }}
                mode="contained"
              >
                <List.Item
                  titleStyle={{
                    color: Palette.Primary,
                    fontFamily: Font.cairo,
                  }}
                  onPress={() => {
                    goTo('CreateAddress');
                  }}
                  title="اضافة عنوان"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="map-marker"
                      color={Palette.Primary}
                    />
                  )}
                />
              </Card>
            </List.Section>
            <List.Section>
              <List.Subheader style={{ fontFamily: Font.cairo }}>
                السيارات
              </List.Subheader>
              {/* {carsList.length < 1 ? null : (
                <View>
                  {carsList.map((car, index) => {
                    return <Text key={index}>{car}</Text>;
                  })}
                </View>
              )} */}
              <Card
                style={{
                  backgroundColor: Palette.White,
                  borderColor: Palette.Light,
                  borderWidth: 1,
                }}
                mode="contained"
              >
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
              </Card>
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
