/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Palette from '../../styles/Colors.style';
import { Font } from '../../styles/Font.style';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = imageW * 1.54;

const slideImages = [
  '../../assets/images/intro1.png',
  '../../assets/images/intro2.png',
  '../../assets/images/intro3.png',
  '../../assets/images/intro4.png',
];

// react function /////////////////////////
export default function Intro() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);

  // font hook =============:
  const [fontsLoaded] = useFonts({
    bold: require('./../../assets/fonts/Tajawal-Bold.ttf'),
    medium: require('./../../assets/fonts/Tajawal-Medium.ttf'),
    light: require('./../../assets/fonts/Tajawal-Light.ttf'),
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return (
    <LinearGradient
      style={Styles.SAVStyleForAndroid}
      colors={[Palette.Primary, Palette.DarkPrimary]}
    >
      <StatusBar backgroundColor={Palette.Primary} />
      <SafeAreaView onLayout={onLayoutRootView}>
        <FlatList
          data={slideImages}
          keyExtractor={(_, index) => {
            index.toString();
          }}
          renderItem={(i) => {
            return (
              <View>
                <Image
                  source={{ uri: i }}
                  style={{ width: imageW, height: imageH, resizeMode: 'cover' }}
                />
              </View>
            );
          }}
        />
        <Text
          variant="displayMedium"
          style={{
            fontFamily: Font.tajawalBold,
            color: Palette.offWight,
          }}
        >
          احصل على افضل الخدمات
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
