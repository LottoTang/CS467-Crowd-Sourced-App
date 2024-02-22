// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

// function imports
import { giveSuggestedItems } from '../../redux/funtionality/helperFunctions.js';

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item}) => {
// item component that represents one suggested item
    const navigation = useNavigation();

    const handleAddItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item});
    };

    const shopping_list = useSelector((state)=> state.shopping_list);

    if (item in shopping_list) {
        return (
              <View style={item_style}>
                  <Text style={text_styles.itemText}>{item}</Text>
                  <Icon
                      name={"check"}
                      size={26}
                      color={styles.secondaryItemBackground.color}
                      style={{alignSelf: 'center', paddingRight: 16}}
                  />
              </View>
        )
    }

    return (
        <View style={item_style}>
            <Text style={text_styles.itemText}>{item}</Text>
            <Text style={button} onPress={()=> handleAddItem(item)}>+</Text>
        </View>
    )
}

const SuggestionList = ({suggestions, search}) => {
// list component for the suggestion list, including title
    // TODO: replace the list with data pulled from querying database

    // leave a message for user when suggestions list is empty
    let msg = "Search for an item to see suggestions"
    if (suggestions.length == 0 && search != '') msg = "No items found"
    if (suggestions.length == 0 || search == '') {
        return (
            <View style={add_style.suggestionList}>
                <Text style={text_styles.smallTitle}>Suggestions</Text>
                <Text style={[text_styles.itemText, {paddingLeft: 16, paddingTop: 8}]}>
                    {msg}
                </Text>
            </View>
        )
    }

    return(
        <View style={add_style.suggestionList}>
            <Text style={text_styles.smallTitle}>Suggestions</Text>

            <FlatList
                data={suggestions}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
        </View>
    )
}


const CreateItem = ({suggestions, product}) => {
// the Create Item component which allows the user to add a new item when the item isn't suggested
    // if the search is empty or exact product name is in the suggestions, don't include this option
    if (product == '') return
    if (suggestions.includes(product)) return

    // if exact name is not suggested, allow user to create item
    // TODO: a function may need to be passed to the ItemComponent to add the item to the database
    return (
        <View style={styles.bottom}>
            <View style={styles.row}>
                <Text style={[text_styles.smallTitle, {alignSelf: 'center', paddingRight: 8, maxWidth: '21%'}]}>Create </Text>
                <View style={{width: '76%'}} >
                    <ItemComponent item={product} />
                </View>
            </View>
        </View>
    )
}


function AddItems() {
// the Add Item screen itself with its components
    const all_products = useSelector((state)=>state.all_products);
    const [suggested_items, setSuggestedItems] = useState('');
    const [product_name, setProductName] = useState('');
    const [productsList, setProductsList] = useState('');

    // Pull all products from the database
    useEffect(() =>{
        const getProducts = async ()=> {
            try {
                await axios.get(`http://10.0.2.2:3000/products/search?name=${product_name}`)
                .then(result => {
                    const listOfNames = result.data.map(item => item["name"]);
                    setProductsList(listOfNames);
                    }
                    )// 
                .catch(error => console.log(error));
            } catch (error){
                console.log(error);
            }
        }

        getProducts();
    }, [product_name]);

    // method giveSuggestedItems will give you item recommendations based on users input
    // Because we don't have access to the database it works with Tomato and Tomato Sauce inputs from the test data
    const handleInputChange = (text)=>{
        setProductName(text);
        setSuggestedItems(productsList);
    }

  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={text_styles.smallTitle}>Search</Text>
            <View style={item_style}>
                <TextInput
                    style={search_text}
                    placeholder='Search for an item'
                    placeholderTextColor={add_style.placeholder.color}
                    value={product_name}
                    onChangeText={handleInputChange}
                />
            </View>
            <SuggestionList suggestions={suggested_items} search={product_name} />
            <CreateItem suggestions={suggested_items} product={product_name}/>
        </View>
    </SafeAreaView>
  );
};

export default AddItems;




const add_style = StyleSheet.create({
    suggestionList: {
        maxHeight: '66%',
        marginTop: 12,
    },
    searchText: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0,
    },
    placeholder: {
        color: `${text_styles.itemText.color}80`
    },
    addButton: {
        fontSize: 21,
        lineHeight: 20,
        paddingTop: 12,
        height: 29,
    },
});

const search_text = [text_styles.itemText, add_style.searchText]
const button = add_button.concat(add_style.addButton);