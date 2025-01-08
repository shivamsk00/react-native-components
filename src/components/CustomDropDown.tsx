import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { screenWidth } from '../ui/Constant';

interface CustomDropDownProps {
  options: string[]; // Array of dropdown options
  placeholder?: string; // Placeholder text
  onSelect?: (value: string) => void; // Callback when a value is selected
  defaultValue?: string; // Default selected value
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  options,
  placeholder = 'Select an option',
  onSelect,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultValue || null,
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setDropdownVisible(false);
    onSelect?.(value);
  };

  return (
    <View style={styles.container}>
      {/* Dropdown Trigger */}
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setDropdownVisible(!isDropdownVisible)}>
        <Text style={styles.selectedText}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      {/* Dropdown Options - Box with Scroll */}
      {isDropdownVisible && (
        <View style={styles.dropdownBox}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  dropdownTrigger: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width for dropdown trigger
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 150, // Limit the dropdown box height
    marginTop: 5,
    paddingVertical: 5,
    position: 'absolute',
    top: 45, // Positioning the dropdown just below the button
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingLeft:screenWidth * 3
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
