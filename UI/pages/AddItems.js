import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import styles, {item_style, text_styles, add_button} from '../style.js';
import { giveSuggestedItems } from '../../redux/funtionality/helperFunctions.js';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const ItemComponent = ({item}) => {
// item component that represents one suggested item
    const navigation = useNavigation();

    const handleAddItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item});
    };

    return (
        <View style={item_style}>
            <Text style={text_styles.itemText}>
                {item}
            </Text>
            <Text style={button} onPress={()=> handleAddItem(item)}>
                +
            </Text>
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
            <Text style={text_styles.smallTitle}>Create an item for "{product}"</Text>
            <ItemComponent item={product} />
        </View>
    )
}


function AddItems() {
// the Add Item screen itself with its components
    const state = useSelector((state)=>state.allItems);
    const allItems = state;
    const [suggestedItems, setSuggestedItems] = useState('');
    const [productName, setProductName] = useState('');

    // method giveSuggestedItems will give you item recommendations based on users input
    // Because we don't have access to the database it works with Tomato and Tomato Sauce inputs from the test data
    const handleInputChange = (text)=>{
        setProductName(text);
        const filterData = giveSuggestedItems(allItems, text);
        setSuggestedItems(filterData);
    }

  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={text_styles.smallTitle}>Search</Text>
            <View style={item_style}>
                <TextInput
                    style={search_text}
                    placeholder='Search for an item at the store'
                    value={productName}
                    onChangeText={handleInputChange}
                />
            </View>
            <SuggestionList suggestions={suggestedItems} search={productName} />
            <CreateItem suggestions={suggestedItems} product={productName}/>
        </View>
    </SafeAreaView>
  );
};

export default AddItems;




const add_style = StyleSheet.create({
    suggestionList: {
        maxHeight: '60%',
        marginTop: 12,
    },
    searchText: {
        width: '100%',
        paddingTop: 0,
        paddingBottom: 0,
    }
});

const search_text = [text_styles.itemText, add_style.searchText]
const button = add_button.concat({fontSize: 16});