import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { color, screenHeight, screenWidth } from '../ui/Constant';

const CustomButton = ({
  style,
  onPress,
  disabled,
  title,
  background,
  size,
  textColor,
  width,
  height,
}) => {
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: background || color.darkBlue,
          width:
            width && width >= 100
              ? '100%'
              : width
              ? screenWidth * width
              : '100%',
          height: height || screenHeight * 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: textColor || color.white,
          fontSize: RFValue(size || 16),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
