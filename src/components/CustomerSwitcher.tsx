import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import {screenHeight, screenWidth} from '../ui/Constant';
// Import screenHeight and screenWidth

interface TreeSwitcherProps {
  value?: boolean; // Controlled value
  onValueChange?: (newValue: boolean) => void; // Callback when the value changes
  activeColor?: string; // Color when the switch is ON
  inactiveColor?: string; // Color when the switch is OFF
  defaultValue?: boolean; // Initial default value if uncontrolled
  size?: 'small' | 'medium' | 'large'; // Size of the switch
}

const sizeStyles = {
  small: {
    width: screenWidth * 13, // 20% of screen width
    height: screenHeight * 3, // 3% of screen height
    sliderSize: screenHeight * 2,
    translateX: screenWidth * 13 - screenHeight * 2 - 4,
  },
  medium: {
    width: screenWidth * 18, // 30% of screen width
    height: screenHeight * 4, // 4% of screen height
    sliderSize: screenHeight * 3,
    translateX: screenWidth * 18 - screenHeight * 3 - 4,
  },
  large: {
    width: screenWidth * 22, // 40% of screen width
    height: screenHeight * 4, // 5% of screen height
    sliderSize: screenHeight * 3,
    translateX: screenWidth * 22 - screenHeight * 3 - 4,
  },
};

const TreeSwitcher: React.FC<TreeSwitcherProps> = ({
  value,
  onValueChange,
  activeColor = '#4caf50',
  inactiveColor = '#ccc',
  defaultValue = false,
  size = 'medium', // Default size is medium
}) => {
  const [isOn, setIsOn] = useState(defaultValue);
  const sliderPosition = React.useRef(
    new Animated.Value(defaultValue ? 1 : 0),
  ).current;

  useEffect(() => {
    if (value !== undefined) {
      setIsOn(value);
      Animated.timing(sliderPosition, {
        toValue: value ? 1 : 0,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  }, [value]);

  const toggleSwitch = () => {
    if (value === undefined) {
      setIsOn(prev => !prev);
      Animated.timing(sliderPosition, {
        toValue: isOn ? 0 : 1,
        duration: 150,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
      onValueChange?.(!isOn);
    } else {
      onValueChange?.(!value);
    }
  };

  const {width, height, sliderSize, translateX} = sizeStyles[size];

  const dynamicSwitchStyles = {
    width,
    height,
    borderRadius: height / 2,
  };

  const dynamicSliderStyles = {
    width: sliderSize,
    height: sliderSize,
    borderRadius: sliderSize / 2,
  };

  const translateXAnimation = sliderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [2, translateX], // Adjusted for padding
  });

  const backgroundColor = sliderPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={toggleSwitch}
      style={styles.switchContainer}>
      <Animated.View
        style={[
          styles.switchBackground,
          dynamicSwitchStyles,
          {backgroundColor},
        ]}>
        <Animated.View
          style={[
            styles.slider,
            dynamicSliderStyles,
            {
              transform: [{translateX: translateXAnimation}],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TreeSwitcher;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
  },
  switchBackground: {
    justifyContent: 'center',
    // paddingHorizontal: 2,
    overflow: 'hidden',
  },
  slider: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
