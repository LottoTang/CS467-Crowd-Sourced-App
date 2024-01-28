import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import { getBrandsList } from '../../../redux/funtionality/helperFunctions';


const TestViewProduct = () => {

    const product = useSelector(state=> state.selectedItem);
    const brandOptions = useSelector(state => state.allItems);

    const brands = getBrandsList(product.name, brandOptions);

  if (!product) {
    return <Text>No product selected</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Brand Selected: <Text style={styles.value}>{product.brand}</Text></Text>
      <Text style={styles.label}>Name: <Text style={styles.value}>{product.name}</Text></Text>
      <Text style={styles.storeCategory}>Available Brands:</Text>
      <View>
        <FlatList
          data = {brands}
          renderItem={({item})=>(

            <Text style={styles.brandOptions}>{item}</Text>
          )}
          />
      </View>
      <Text style={styles.storeCategory}>
        Stores placeholder for when live feed is ready for store recommendations
      </Text>
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
  },
  storeCategory: {
    fontSize: 30,
    fontWeight: "bold"
  },
  brandOptions: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "green",
    color: "white"
  }
});

export {TestViewProduct};
