import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { giveSuggestedItems } from '../../../redux/funtionality/helperFunctions';
import { useSelector } from 'react-redux';

const AddItemForm = () => {
  const [productName, setProductName] = useState('');
  const [data, setData] = useState('');

  const state = useSelector((state)=>state.allItems);
  const navigation = useNavigation();
  const allItems = state;

  const handleInputChange = (text)=>{
    setProductName(text);

    const filterData = giveSuggestedItems(allItems, productName);

    setData(filterData);
  }

  const handleAddItem = () => {
    // Go to select brand page
    navigation.navigate('TestBrandSelect', {product: productName});
  };

  const handleRecommendation = (text)=>{
    navigation.navigate('TestBrandSelect', {product: text});
  }

  return (
    <View style={styles.container}>
      <Text>Add Item to Shopping List</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Product Name"
        value={productName}
        onChangeText={handleInputChange}
      />
      <Text style={styles.segment}>Suggestions</Text>

      <Text>Placeholder for suggested items - for testing it works only with words tomato and sauce</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=>(
          <Pressable onPress={()=> handleRecommendation(item)}>
          <Text style={styles.recommendedItems}>{item}</Text>
          </Pressable>
        )}/>
      <Pressable onPress={()=>handleAddItem()}>
        <Text style={styles.button}>Add: {productName}</Text>
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
  },
  segment: {
    fontSize: 20,
    fontWeight: "bold"
  },
  recommendedItems: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "green",
    margin: 5,
    color: "white",
    textAlign: "center"
  }
});

export {AddItemForm};
