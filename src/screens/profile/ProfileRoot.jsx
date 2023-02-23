import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, I18nManager, RefreshControl } from 'react-native';
import { Text, List, Divider, Card } from 'react-native-paper';
import { Flex, Box, Wrap } from '@react-native-material/core';
import { firebase } from '../../../../config/firebase';
import Version from '../../../components/Version.component';

// hooks:
import useNav from '../../../hooks/useNav.hook';
import KMFont from '../../../hooks/useFont.hook';
import usePalette from '../../../hooks/usePalette.hook';
import useLink from '../../../hooks/useLink.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function ProfileRoot() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();

  const Palette = usePalette();

  const [refreshing, setRefreshing] = React.useState(false);
  const { currentUser } = firebase.auth();
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;
  const [currentUserAddress, setCurrentUserAddress] = React.useState('');
  const [currentUserCar, setCurrentUserCar] = React.useState('');

  // local handler =============:

  const getCurrentUserVerified = () => {
    return firebase.auth().currentUser.emailVerified;
  };

  const getAddressData = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if (setCurrentUserAddress(snapshot?.data()?.userAddress)) {
            setCurrentUserAddress(snapshot?.data()?.userAddress);
          }
        } else {
          console.log('user does not exist');
        }
      });
  };

  const getCarData = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if (setCurrentUserCar(snapshot?.data()?.userCar)) {
            setCurrentUserCar(snapshot?.data()?.userCar);
          }
        } else {
          console.log('user does not exist');
        }
      });
  };

  React.useEffect(() => {
    getAddressData();
    getCarData();
  }, []);

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAddressData();
    getCarData();
    getCurrentUserVerified();
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
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
              fontFamily: KMFont.Medium,
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
              <List.Subheader style={{ fontFamily: KMFont.Medium }}>
                العناوين
              </List.Subheader>
              {currentUserAddress ? (
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
                      <Text style={{ paddingHorizontal: 2 }} />

                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserAddress?.reg}
                      </Text>
                      <Text style={{ paddingHorizontal: 2 }}>-</Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserAddress?.city}
                      </Text>
                      <Text style={{ paddingHorizontal: 2 }}>-</Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserAddress?.dis}
                      </Text>
                    </Wrap>
                  </Card.Content>
                </Card>
              ) : null}
              <Box>
                <List.Item
                  titleStyle={{
                    color: Palette.Primary,
                    fontFamily: KMFont.Medium,
                  }}
                  onPress={() => {
                    go.to('CreateAddress');
                  }}
                  title={!currentUserAddress ? 'اضافة عنوان' : 'تحديث العنوان'}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={!currentUserAddress ? 'map-marker' : 'pencil-box'}
                      color={Palette.Primary}
                    />
                  )}
                />
              </Box>
            </List.Section>
            <List.Section>
              <List.Subheader style={{ fontFamily: KMFont.Medium }}>
                السيارات
              </List.Subheader>
              {currentUserCar ? (
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
                        name="car"
                        size={15}
                        color={Palette.DarkGray}
                      />
                      <Text style={{ paddingHorizontal: 2 }} />

                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserCar?.make}
                      </Text>
                      <Text style={{ paddingHorizontal: 2 }}>-</Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserCar?.model}
                      </Text>
                      <Text style={{ paddingHorizontal: 2 }}>-</Text>
                      <Text
                        variant="bodyMedium"
                        style={{
                          fontFamily: KMFont.Medium,
                          color: Palette.DarkGray,
                        }}
                      >
                        {currentUserCar?.year}
                      </Text>
                    </Wrap>
                  </Card.Content>
                </Card>
              ) : null}
              <Box>
                <List.Item
                  titleStyle={{
                    color: Palette.Primary,
                    fontFamily: KMFont.Medium,
                  }}
                  onPress={() => {
                    go.to('CreateCar');
                  }}
                  title={!currentUserCar ? 'اضافة سيارة' : 'تحديث السيارة'}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={!currentUserCar ? 'car' : 'pencil-box'}
                      color={Palette.Primary}
                    />
                  )}
                />
              </Box>
            </List.Section>
            <List.Section>
              <List.Subheader style={{ fontFamily: KMFont.Medium }}>
                الاعدادات
              </List.Subheader>
              <Box>
                <List.Item
                  titleStyle={{
                    color: Palette.Primary,
                    fontFamily: KMFont.Medium,
                  }}
                  onPress={() => {
                    go.to('UpdatePassword');
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
              </Box>
              <Box>
                <List.Item
                  titleStyle={{
                    color: Palette.Error,
                    fontFamily: KMFont.Medium,
                  }}
                  onPress={() => {
                    firebase.auth().signOut();
                  }}
                  title="تسجيل خروج"
                  left={(props) => (
                    <List.Icon {...props} icon="logout" color={Palette.Error} />
                  )}
                />
              </Box>
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
                  fontFamily: KMFont.Medium,
                  color: Palette.Secondary,
                }}
              >
                قم بتفعيل حسابك لتمكين الاعدادات
              </List.Subheader>
              <List.Item
                titleStyle={{ color: Palette.Error, fontFamily: KMFont.Medium }}
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
        <Button
          mode="text"
          labelStyle={{
            fontFamily: KMFont.Medium,
          }}
          textColor={Palette.PrimLight}
          onPress={() => openLink('https://kareemabo3id.github.io/ourcar-TOU/')}
        >
          سياسة الاستخدام والخصوصية
        </Button>
        <Version />
      </ScrollView>
    </Box>
  );
}
