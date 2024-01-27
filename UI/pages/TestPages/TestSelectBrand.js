import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItemInShoppingList } from '../../../redux/actions/actions';

const BrandSelector = ({route}) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const {product, otherParam} = route.params;

  const brands = ['Brand A', 'Brand B', 'Brand C'];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSelectBrand = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePress = ()=>{
    dispatch(addItemInShoppingList(product, selectedBrand));
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.targetProduct}>{product}</Text>
        <Text style={styles.textCategory}>Brands</Text>
        {brands.map((brand, index) => (
            <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => onSelectBrand(brand)}
            >
            <Text style={styles.radioButton}>
                {selectedBrand === brand ? '●' : '○'}
            </Text>
            <Text style={styles.text}>{brand}</Text>
            </TouchableOpacity>
        ))}
        <Pressable onPress={()=>handlePress()}>
            <Text style={styles.buttonSubmit}>Submit</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  textCategory: {
    fontSize: 20,
    fontWeight: "bold"
  },
  targetProduct: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonSubmit: {
    fontSize: 30,
    color: "white",
    backgroundColor: "blue",
    textAlign: "center"
  }
});

export {BrandSelector};
