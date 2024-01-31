import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';
import { useState } from 'react';
import styles, {item_style, text_styles, add_button} from '../style.js';
import { giveSuggestedItems } from '../../redux/funtionality/helperFunctions.js';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const SuggestionList = ({suggestions}) => {
// list component for the suggestion list, including title
    // TODO: replace this with data pulled from querying database

    const navigation = useNavigation();

    const handleAddItem = (item) => {
        // Go to select brand page
        navigation.navigate('TestBrandSelect', {product: item});
    };

    const handleRecommendation = (text)=>{
        navigation.navigate('TestBrandSelect', {product: text});
    }

    return(
        <View style={add_style.suggestionList}>
            <Text style={text_styles.smallTitle}>Suggestions</Text>
            
            <FlatList
                data={suggestions}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <View style={suggestion}>
                        <Text style={add_style.suggestionText}>
                            {item}
                        </Text>
                        <Pressable onPress={()=> handleRecommendation(item)}>
                            <Text style={button} onPress={()=> handleAddItem(item)}>
                                +
                            </Text>
                        </Pressable>
                    </View>
                }
            />
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
            <TextInput
                style={search}
                placeholder='Search for an item'
                value={productName}
                onChangeText={handleInputChange}
            />
            <SuggestionList suggestions={suggestedItems} />
        </View>
        <NavigationBar/>
    </SafeAreaView>
  );
};

export default AddItems;




const add_style = StyleSheet.create({
    suggestionList: {
        maxHeight: '60%',
        marginTop: 12,
    },
    suggestionText: {
        color: text_styles.itemText.color,
        fontFamily: text_styles.itemText.fontFamily,

        paddingTop: 4,
        paddingBottom: 4
    },
    suggestionBox: {
        width: '96.5%',

        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
});

const search = item_style.concat({padding: 9})
const suggestion = item_style.concat(styles.wideRow, add_style.suggestionBox);
const button = add_button.concat({fontSize: 16});