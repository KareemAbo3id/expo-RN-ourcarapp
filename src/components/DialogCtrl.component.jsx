/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import { Flex, Wrap } from '@react-native-material/core';
import React from 'react';
import { View, StyleSheet, StatusBar, I18nManager } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import Palette from '../styles/Colors.style';
import { Font } from '../styles/Font.style';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function DialogCtrl({
  visible,
  onDismiss,
  content,
  actionButtonOnPress,
  actionButtonTitle,
}) {
  // local hooks:

  // local handlers:

  // local ui:
  return (
    <Provider>
      <StatusBar backgroundColor={Palette.DarkPrimary} />
      <View>
        <Portal>
          <Dialog
            style={[{ backgroundColor: Palette.White }, Styles.radius]}
            visible={visible}
            onDismiss={onDismiss}
          >
            <Flex justify="center" items="center" direction="column">
              <Dialog.Content>
                <Text variant="bodyLarge" style={Styles.mediumFont}>
                  {content}
                </Text>
              </Dialog.Content>
              <Wrap justify="start" items="center">
                <Dialog.Actions>
                  <Button
                    mode="text"
                    labelStyle={Styles.mediumFont}
                    textColor={Palette.Primary}
                    style={Styles.radius}
                    onPress={actionButtonOnPress}
                  >
                    {actionButtonTitle}
                  </Button>
                </Dialog.Actions>
              </Wrap>
            </Flex>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const Styles = StyleSheet.create({
  mediumFont: { fontWeight: Font?.tajawalMedium, lineHeight: 25 },
  radius: { borderRadius: 4 },
});
