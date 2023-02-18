/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable no-else-return */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
import { Box, Flex, Stack } from '@react-native-material/core';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { firebase } from '../../config/firebase';
import { ContainedButtonCtrl } from '../components/ButtonCtrl.component';
import { Font } from '../styles/Font.style';
import Palette from '../styles/Colors.style';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CreateAddress() {
  // local hooks =============:
  const { currentUser } = firebase.auth();
  const { credential } = firebase.auth.EmailAuthProvider;

  const [isLoading, setLoading] = React.useState(true);
  const [regions, setRegions] = React.useState();
  const [cities, setCities] = React.useState();
  const [districts, setDistricts] = React.useState();

  React.useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/master/json/regions_lite.json'
    )
      .then((response) => response.json())
      .then((json) => setRegions(json.map()))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    fetch(
      'https://raw.githubusercontent.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/master/json/cities_lite.json'
    )
      .then((response) => response.json())
      .then((json) => setCities(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    fetch(
      'https://raw.githubusercontent.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/master/json/districts_lite.json'
    )
      .then((response) => response.json())
      .then((json) => setDistricts(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [regionsSelect, setRegionsSelect] = React.useState('');
  const [citiesSelect, setCitiesSelect] = React.useState('');
  const [districtsSelect, setDistrictsSelect] = React.useState('');

  // local handlers =============:

  // local ui =============:
  const ListPlaceholder = ({ text }) => {
    return (
      <Flex direction="row" justify="center" items="center">
        <Text
          style={{
            fontFamily: Font.cairo,
            color: Palette.Secondary,
            fontSize: 16,
          }}
        >
          {text}
        </Text>
        <Box mh={5} />
        <Box>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={Palette.Primary}
          />
        </Box>
      </Flex>
    );
  };

  return (
    <KeyboardAvoidingView style={Styles.SAVStyleForAndroid}>
      <Stack spacing={5}>
        <Text>{category}</Text>
        <Text>{subCategory}</Text>
        <Box>
          <SelectList
            // SelectList Logic:
            setSelected={setCategory}
            data={citiesList}
            // SelectList Style:
            fontFamily={Font.cairo}
            search={false}
            dropdownStyles={ListStyles.dropdownStyles}
            boxStyles={ListStyles.boxStyles}
            inputStyles={ListStyles.inputStyles}
            dropdownTextStyles={ListStyles.dropdownTextStyles}
            placeholder={<ListPlaceholder text="المنطقة / المدينة" />}
            arrowicon={<MaterialCommunityIcons name="menu-down" size={30} />}
          />
        </Box>
        {category && (
          <Box>
            <SelectList
              // SelectList Logic:
              setSelected={setSubCategory}
              data={districtsList[category]}
              // SelectList Style:
              fontFamily={Font.cairo}
              dropdownShown={false}
              search={false}
              dropdownStyles={ListStyles.dropdownStyles}
              boxStyles={ListStyles.boxStyles}
              inputStyles={ListStyles.inputStyles}
              dropdownTextStyles={ListStyles.dropdownTextStyles}
              placeholder={<ListPlaceholder text="الحي" />}
              arrowicon={<MaterialCommunityIcons name="menu-down" size={30} />}
            />
          </Box>
        )}
        {/* UPDATE BUTTON ================================ */}
        <Box>
          <ContainedButtonCtrl title="تحديث" onPress={() => {}} />
        </Box>
      </Stack>
    </KeyboardAvoidingView>
  );
}

const ListStyles = {
  dropdownStyles: {
    borderWidth: 1,
    borderColor: Palette.Light,
    backgroundColor: Palette.White,
    elevation: 2,
    position: 'absolute',
    zIndex: 22,
    marginTop: 55,
    width: '100%',
    borderRadius: 4,
  },
  boxStyles: {
    borderColor: Palette.Primary,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyles: { color: Palette.DarkGray, fontSize: 16 },
  dropdownTextStyles: { color: Palette.DarkGray, fontSize: 16 },
};

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 10,
    borderColor: Palette.Secondary,
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: Palette.White,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
});
