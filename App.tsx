import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyle} from './src/ui/Constant';
import CustomButton from './src/components/CustomButton';
import CustomeInputText from './src/components/CustomeInputText';

const App = () => {
  return (
    <View style={[commonStyle.container, {gap: 20}]}>
      <CustomButton title="hello" />
      <CustomeInputText />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
