import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
import { encode } from 'base-64';


const TestPostLiveFeed = () => {
  const [review, setReview] = useState('');
  const [product, setProduct] = useState('');
  const [store, setStore] = useState('');
  const navigation = useNavigation();

  const handleReviewChange = (text) => {
    setReview(text);
  };

  const handleProductChange = (text) => {
    setProduct(text);
  };

  const handleStoreChange = (text) => {
    setStore(text);
  };

  const handleSubmit = () => {

    setReview('');
    setProduct('');
    setStore('');

    // Handle form submission here, you can send the data to a backend or perform any other action.
    const fetchData = async () => {
      try {
        //const response = await axios.post(`https://localhost:3000/products`);
        //const result = await response.json();
        //console.log(result);
      } catch (error) {
        console.error(error);
      }
    }; 
    fetchData();
    
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your review"
        onChangeText={handleReviewChange}
        value={review}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter product"
        onChangeText={handleProductChange}
        value={product}
      />
      <TextInput    
        style={styles.input}
        placeholder="Enter store"
        onChangeText={handleStoreChange}
        value={store}
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

export default TestPostLiveFeed;
