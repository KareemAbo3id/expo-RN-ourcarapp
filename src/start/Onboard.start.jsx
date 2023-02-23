import React, { useState, useRef } from 'react';
import {
  StatusBar,
  FlatList,
  Animated,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  View,
} from 'react-native';
import { Box, Flex } from '@react-native-material/core';
import { Button } from 'react-native-paper';

// others:
import OnboardingItem from '../../components/OnboardingItem.component';
import OnboardingPaginator from '../../components/OnboardingPaginator.component';
import onBoardList from '../../../data/onboardList';

// hooks:
import useNav from '../../hooks/useNav.hook';
import KMFont from '../../hooks/useFont.hook';
import usePalette from '../../hooks/usePalette.hook';
import useLink from '../../hooks/useLink.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function Onboard() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // onboard slides functions: =============:
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // local ui =============:

  return (
    <SafeAreaView
      style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}
    >
      <StatusBar backgroundColor="transparent" translucent />
      <View
        style={{
          backgroundColor: Palette.Primary,
          height: 500,
          width: 600,
          borderRadius: 80,
          position: 'absolute',
          transform: [{ rotate: '20deg' }],
          top: -250,
          left: 60,
          elevation: 20,
          zIndex: -2,
        }}
      />
      <View
        style={{
          backgroundColor: Palette.PrimLight,
          opacity: 0.2,
          height: 500,
          width: 600,
          borderRadius: 80,
          position: 'absolute',
          transform: [{ rotate: '20deg' }],
          top: -200,
          left: 120,
          zIndex: -1,
        }}
      />
      <View
        style={{
          backgroundColor: Palette.Primary,
          opacity: 0.55,
          height: 500,
          width: 600,
          borderRadius: 80,
          position: 'absolute',
          transform: [{ rotate: '30deg' }],
          bottom: -400,
          right: 110,
          zIndex: -1,
        }}
      />

      <Flex
        direction="column"
        justify="center"
        items="center"
        style={{ flex: 0.8 }}
      >
        <FlatList
          data={onBoardList}
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
        <OnboardingPaginator data={onBoardList} scrollX={scrollX} />
      </Flex>
      <Flex
        direction="column"
        justify="start"
        items="stretch"
        style={{ flex: 0.2 }}
        ph={25}
      >
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
        <Box pv={2} />
        <Button
          mode="text"
          textColor={Palette.PrimLight}
          style={{ borderRadius: 2000 }}
          labelStyle={{
            fontFamily: KMFont.Medium,
            fontSize: 18,
            lineHeight: 29,
          }}
          onPress={() => go.to('signup')}
        >
          مستخدم جديد؟ انشئ حسابك
        </Button>
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
      </Flex>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    height: '100%',
  },
});
