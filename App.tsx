import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyle} from './src/ui/Constant';
import CustomButton from './src/components/CustomButton';
import CustomeInputText from './src/components/CustomeInputText';
import CustomSwitch from './src/components/CustomerSwitcher';
import CustomText from './src/components/CustomText';
import CustomDropDown from './src/components/CustomDropDown';
import CustomCalenderPicker from './src/components/CustomCalenderPicker';
import CustomDatePicker from './src/components/CustomDatePicker';

const App = () => {
  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };
  return (
    <>
      <CustomDropDown
        options={[
          'item 1',
          'item 2',
          'item 3',
          'item 4',
          'item 1',
          'item 2',
          'item 3',
          'item 4',
        ]}
        placeholder="Choose an option"
        defaultValue="Option 2" // Setting the default value
        onSelect={handleSelect}
      />

      <ScrollView>
        <View style={[commonStyle.container, {gap: 20}]}>
          <CustomButton title="Submit" background="orange" />
          <CustomeInputText heigth={5} width={100} />

          <CustomSwitch
            size="small"
            defaultValue={true}
            onValueChange={value => console.log('Small Switch:', value)}
          />
          <CustomSwitch
            size="medium"
            defaultValue={true}
            activeColor="#007bff"
            onValueChange={value => console.log('Medium Switch:', value)}
          />
          <CustomSwitch
            size="large"
            inactiveColor="gray"
            activeColor="lightblue"
            defaultValue={true}
            onValueChange={value => console.log('Large Switch:', value)}
          />

          <CustomText variant="h2" color="#fff">
            Custom Text components
          </CustomText>

          <CustomDatePicker disableFuture={true} disablePast={true} />
          <CustomCalenderPicker />
        </View>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
