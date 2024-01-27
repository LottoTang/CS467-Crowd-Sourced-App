import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';

const TestViewProduct = () => {

    const product = useSelector(state=> state.selectedItem);

  if (!product) {
    return <Text>No product selected</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID: <Text style={styles.value}>{product.item_id}</Text></Text>
      <Text style={styles.label}>Brand: <Text style={styles.value}>{product.brand}</Text></Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{product.name}</Text></Text>
      <Text style={styles.label}>Store: <Text style={styles.value}>{product.store_id}</Text></Text>
      <Text style={styles.label}>Category: <Text style={styles.value}>{product.category}</Text></Text>
      <Text style={styles.label}>Price: <Text style={styles.value}>{product.price}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontWeight: 'normal',
  }
});

export {TestViewProduct};
