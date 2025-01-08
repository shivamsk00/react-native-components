import {Dimensions, StyleSheet} from 'react-native';
export const screenHeight = Dimensions.get('screen').height / 100;
export const screenWidth = Dimensions.get('screen').width / 100;
export const fullWith = Dimensions.get('screen').width;
export const fullHeight = Dimensions.get('screen').height;

export const color = {
  darkBlue: '#00008B',
  white: '#fff',
  lightBlue: '#ADD8E6',
};

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 10,
    backgroundColor: '#444',
  },

  button: {
    width: '100%',
    height: screenHeight * 6,
    backgroundColor: color.darkBlue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
