import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, commonStyle} from '../ui/Constant';
import {RFValue} from 'react-native-responsive-fontsize';
interface commonButtonProps {
  title?: string;
  onPress?: () => void;
  style?: any;
  disabled?: boolean;
  background?: string;
  textColor?: string;
  size?: number;
}

const CustomButton: FC<commonButtonProps> = ({
  style,
  onPress,
  disabled,
  title,
  background,
  size,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        style,
        commonStyle.button,
        {backgroundColor: background || color.darkBlue},
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
