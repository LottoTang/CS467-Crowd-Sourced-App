import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const TestScanInput = ({route}) => {
  const [store, setStore] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [sale, setSale] = useState('');
  const barcode = route.params.barcode;

  const navigation = useNavigation();

  const handleStore = (text) => {
    setStore(text);
  };

  const handleBrand = (text) => {
    setBrand(text);
  };

  const handlePrice = (text) => {
    setPrice(text);
  };

  const handleTag = (text) => {
    setTag(text);
  };

  const handleDate = (text) => {
    setDate(text);
  };

  const handleSale = (text) => {
    setSale(text);
  };

  const handleSubmit = () => {
    // Handle form submission here, you can send the data to a backend or perform any other action.

    // TODO --> Add request to database
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Store"
        onChangeText={handleStore}
        value={store}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand"
        onChangeText={handleBrand}
        value={brand}
      />
      <TextInput    
        style={styles.input}
        placeholder="price"
        onChangeText={handlePrice}
        value={price}
      />
      <TextInput    
        style={styles.input}
        placeholder="tag"
        onChangeText={handleTag}
        value={tag}
      />
      <TextInput    
        style={styles.input}
        placeholder="date"
        onChangeText={handleDate}
        value={date}
      />
      <TextInput    
        style={styles.input}
        placeholder="sale"
        onChangeText={handleSale}
        value={sale}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default TestScanInput;
