import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, commonStyle, screenHeight, screenWidth} from '../ui/Constant';
import {RFValue} from 'react-native-responsive-fontsize';
interface commonButtonProps {
  title?: string;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
  background?: string;
  textColor?: string;
  size?: number;
  width?: number;
  heigth?: number;
}

const CustomButton: FC<commonButtonProps> = ({
  style,
  onPress,
  disabled,
  title,
  background,
  size,
  textColor,
  width,
  heigth,
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
          height: heigth || screenHeight * 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={{
          color: textColor || color.white,
          fontSize: RFValue(size || 16),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
