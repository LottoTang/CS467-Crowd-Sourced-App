import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { handleData } from '../../../redux/funtionality/connectionMongo';



const TestPostLiveFeed = () => {
  const [review, setReview] = useState('');
  const [product, setProduct] = useState('');
  const [store, setStore] = useState('');
  const [data, setData] = useState([]);
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

  //const test = (id='65d1068bd8eb909b1da3f09d') 

  const handleSubmit = () => {
    
    setReview('');
    setProduct('');
    setStore('');

    // Testing call to database. Not valuable data at this point
    const fetchData = async ()=>{
      try{
        const response = await axios.get("http://10.0.2.2:3000/items/65d1068bd8eb909b1da3f09d");
        setData(response.data);
        //console.log(response.data);
      } catch(error) {
        console.log(error);
      }
    }
    fetchData();
    console.log(data);
    // Handle form submission here, you can send the data to a backend or perform any other action.
   

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
