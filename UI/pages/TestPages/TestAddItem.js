import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItemInShoppingList } from '../../../redux/actions/actions';

const AddItemForm = () => {
  const [id, setId] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');

  const state = useSelector((state)=>state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddItem = () => {
    // Validate the input fields if needed
    //console.log("Pressed");

    // Pass the new item to the parent component
    dispatch(addItemInShoppingList(id, store, productName, brand, category, price));
    // Go to homepage
    navigation.navigate('Home');
    
  };

  return (
    <View style={styles.container}>
      <Text>Add Item to Shopping List</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="store"
        value={store}
        onChangeText={setStore}
      />
      <TextInput
        style={styles.input}
        placeholder="Brand"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Pressable onPress={()=>handleAddItem()}>
        <Text style={styles.button}>Add Item</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: "blue",
    fontSize: 20,
    textAlign: "center",
    color: "white"
  }
});

export {AddItemForm};
