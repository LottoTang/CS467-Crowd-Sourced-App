import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TestScanInput = () => {
  const [review, setReview] = useState('');
  const [product, setProduct] = useState('');
  const [store, setStore] = useState('');

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
    // Handle form submission here, you can send the data to a backend or perform any other action.
    console.log('Review:', review);
    console.log('Product:', product);
    console.log('Store:', store);
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

export default TestScanInput;
