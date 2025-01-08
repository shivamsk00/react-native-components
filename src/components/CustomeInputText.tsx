import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {commonStyle, screenHeight} from '../ui/Constant';
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
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          style,
          {
            height: '100%',
            width: '100%',
            fontFamily: 'Poppins-Medium',
            paddingHorizontal: 15,
          },
        ]}
        placeholder={placeholder || 'enter you placeholder'}
        returnKeyType={returnKeyType}
        textAlign={textAlign}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

export default CustomeInputText;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: screenHeight * 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
   
  },
});
