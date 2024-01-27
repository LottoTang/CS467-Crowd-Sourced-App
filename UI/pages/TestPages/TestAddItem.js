import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddItemForm = () => {
  const [productName, setProductName] = useState('');

  //const state = useSelector((state)=>state);
  //const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddItem = () => {
    // Go to select brand page
    navigation.navigate('TestBrandSelect', {product: productName});
    
  };

  return (
    <View style={styles.container}>
      <Text>Add Item to Shopping List</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <Text style={styles.segment}>Suggestions</Text>
      <Text>Placeholder for suggested items</Text>
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
  }
});

export {AddItemForm};
