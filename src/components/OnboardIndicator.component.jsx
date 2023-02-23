/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Flex } from '@react-native-material/core';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function OnboardIndicator({ data, scrollX }) {
  // local hooks:
  const Palette = usePalette();
  const { width } = useWindowDimensions();

  // local handlers:

  // local ui:
  return (
    <Flex direction="row-reverse" pv={30}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 20, 5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              Styles.dot,
              { width: dotWidth, backgroundColor: Palette.Warning },
            ]}
            key={i.toString()}
          />
        );
      })}
    </Flex>
  );
}

const Styles = StyleSheet.create({
  dot: {
    height: 3,
    borderRadius: 100,
    marginHorizontal: 10,
  },
});