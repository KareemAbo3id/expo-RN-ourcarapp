/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import {
  StatusBar,
  FlatList,
  Animated,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Flex } from '@react-native-material/core';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Palette from '../../styles/Colors.style';
import { Font } from '../../styles/Font.style';
import OnboardingItem from '../../components/OnboardingItem.component';
import OnboardingPaginator from '../../components/OnboardingPaginator.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
SplashScreen.preventAutoHideAsync();

const slideImages = [
  {
    id: 1,
    title: 'احجز بسهولة',
    describe: 'احجز مركز الصيانة المفضل',
    image: require('../../assets/images/intro1.png'),
  },
  {
    id: 2,
    title: 'احجز بسهولة',
    describe: 'احجز مركز الصيانة المفضل',
    image: require('../../assets/images/intro2.png'),
  },
  {
    id: 3,
    title: 'احجز بسهولة',
    describe: 'احجز مركز الصيانة المفضل',
    image: require('../../assets/images/intro3.png'),
  },
  {
    id: 4,
    title: 'احجز بسهولة',
    describe: 'احجز مركز الصيانة المفضل',
    image: require('../../assets/images/intro4.png'),
  },
];

// react function /////////////////////////
export default function Onboarding() {
  // local hooks =============:
  const Navigation = useNavigation();
  const goTo = (path) => Navigation.navigate(path);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidesRef = React.useRef(null);

  const viewableItemsChanged = React.useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

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
      colors={[Palette.bg1, Palette.bg2]}
      style={Styles.SAVStyleForAndroid}
      onLayout={onLayoutRootView}
    >
      <Flex
        direction="column"
        justify="center"
        items="center"
        style={{ flex: 0.8 }}
      >
        <StatusBar backgroundColor={Palette.bg1} />
        <FlatList
          data={slideImages}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <OnboardingPaginator data={slideImages} scrollX={scrollX} />
      </Flex>
      <Flex
        direction="column"
        justify="start"
        items="stretch"
        style={{ flex: 0.2 }}
        ph={20}
      >
        <Button
          mode="contained"
          buttonColor={Palette.SecLight}
          textColor={Palette.Primary}
          style={{ borderRadius: 2000 }}
          labelStyle={{
            fontFamily: Font.tajawalMedium,
            fontSize: 20,
            lineHeight: 30,
          }}
        >
          تسجيل الدخول
        </Button>
        <Box pv={8} />
        <Button
          mode="contained"
          buttonColor={Palette.SecLight}
          textColor={Palette.Primary}
          style={{ borderRadius: 2000 }}
          labelStyle={{
            fontFamily: Font.tajawalMedium,
            fontSize: 20,
            lineHeight: 30,
          }}
        >
          انشئ حسابك
        </Button>
      </Flex>
    </LinearGradient>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    height: '100%',
  },
});
