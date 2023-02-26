/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import centersList from '../../data/centersList';
import CenterItem from '../components/CenterItem.component';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function EntryNav() {
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = useState(false);

  // local handlers:

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  // local ui:
  return (
    <Stack ph={10}>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <FlatList
        data={centersList}
        renderItem={({ item }) => (
          <CenterItem
            key={item.id}
            image={item.image}
            title={item.title}
            describe={item.describe}
            rates={item.rates}
            stars={item.stars.map((i, j) => {
              if (i === 1) {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.Warning2} />;
              } else {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.SecPrimary} />;
              }
            })}
            services={item.services.map((i, o) => {
              return (
                <Stack key={o} direction="row" items="center" justify="between" w="100%" ph={10}>
                  <Stack direction="row" items="center" justify="start" spacing={5}>
                    <MaterialCommunityIcons name="car-wash" size={20} color={Palette.Info} />
                    <Text
                      variant="titleMedium"
                      style={{ color: Palette.Black, fontFamily: KMFont.Bold }}
                    >
                      {i.serName}
                    </Text>
                  </Stack>
                  <Text
                    variant="titleMedium"
                    style={{ color: Palette.Success, fontFamily: KMFont.Bold }}
                  >
                    SAR {i.serPrice}
                  </Text>
                </Stack>
              );
            })}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </Stack>
  );
}
