import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';
import React, {FC} from 'react';
import {commonStyle, screenHeight, screenWidth} from '../ui/Constant';
interface TextInputProps {
  placeholder?: string; // Placeholder text for the TextInput
  value?: string; // Current value of the TextInput
  onChangeText?: (text: string) => void; // Callback function for handling text change
  secureTextEntry?: boolean; // If true, masks the input text (useful for passwords)
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad'
    | 'visible-password'; // Type of keyboard to display
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; // Controls text capitalization
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  style?: object | Array<object>;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  autoFocus?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  placeholderTextColor?: string;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  width?: number;
  heigth?: number;
  color?: string;
  backgroundColor?: string;
}
const CustomeInputText: FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  maxLength,
  multiline,
  numberOfLines,
  editable,
  style,
  returnKeyType,
  autoFocus,
  textAlign,
  placeholderTextColor,
  onSubmitEditing,
  onFocus,
  onBlur,
  textAlignVertical,
  heigth,
  width,
  color,
  backgroundColor,
}) => {
  return (
    <TextInput
      style={[
        {
          height: heigth ? screenHeight * heigth : screenHeight * 5,
          width:
            width && width >= 100
              ? '100%'
              : width
              ? screenWidth * width
              : '100%',
          fontFamily: 'Poppins-Regular',
          paddingHorizontal: 15,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: backgroundColor || '#fff',
          borderColor: '#E5E4E2',
          color: color || '#000',
        },
      ]}
      placeholder={placeholder || 'placeholder'}
      returnKeyType={returnKeyType}
      textAlign={textAlign}
      onChangeText={onChangeText}
      placeholderTextColor={placeholderTextColor || '#666'}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      value={value}
      onSubmitEditing={onSubmitEditing}
      onFocus={onFocus}
      onBlur={onBlur}
      textAlignVertical={textAlignVertical}
      autoFocus={autoFocus}
    />
  );
};

export default CustomeInputText;
