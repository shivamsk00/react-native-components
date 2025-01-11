import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {screenHeight} from '../ui/Constant';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    city: '',
    state: '',
    pin_code: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
  };

  const handleRegister = () => {
    // Perform registration logic here
    console.log('User Details:', form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={styles.image}
      />
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.first_name}
          onChangeText={value => handleInputChange('first_name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.last_name}
          onChangeText={value => handleInputChange('last_name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={value => handleInputChange('mobile', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={form.city}
          onChangeText={value => handleInputChange('city', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={form.state}
          onChangeText={value => handleInputChange('state', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          keyboardType="numeric"
          value={form.pin_code}
          onChangeText={value => handleInputChange('pin_code', value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 18,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 0,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#007bff', // Blue background
    borderTopLeftRadius: 20, // Top-left corner curved
    borderTopRightRadius: 20, // Top-right corner curved
    paddingTop: 40,
    paddingHorizontal: 10,
    // paddingBottom: 10,
    marginTop: 10,
    height: screenHeight * 68,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
