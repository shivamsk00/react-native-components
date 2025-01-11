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
import CustomSlider from './src/components/CustomSlider';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  const images = [
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504548840739-580b10ae7715?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1673555791730-0ee56e1b768b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const handleSelect = (value: string) => {
    console.log('Selected:', value);
  };

  return(
    <RegisterScreen />
  )



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
          {/* <CustomButton title="Submit" background="orange" />
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
          <CustomCalenderPicker /> */}

          <CustomSlider
            images={images}
            autoPlay={true}
            autoPlayInterval={1500}
            loop={true} // Enable looping
            showSlideIndicator={true}
            slideIndicatorColor="blue"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
