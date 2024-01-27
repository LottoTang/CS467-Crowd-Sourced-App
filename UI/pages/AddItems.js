import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';
import styles, {item_style, text_styles, add_button} from '../style.js';


const SuggestionList = () => {
// list component for the suggestion list, including title
    // TODO: replace this with data pulled from querying database
    const list_data = ["potatoes", "sweet potatoes", "mashed potatoes"]
    const long_list = ["tomatoes", "cherry tomatoes", "tomato sauce", "tomato puree", "tomato concentrate", "canned tomatoes", "strained tomatoes"]
    return(
        <View style={add_style.suggestionList}>
            <Text style={text_styles.smallTitle}>Suggestions</Text>
            <FlatList
                data={list_data}
                renderItem = { ({item}) =>
                    <View style={suggestion}>
                        <Text style={add_style.suggestionText}>
                            {item}
                        </Text>
                        <Text style={button}>
                            +
                        </Text>
                    </View>
                }
            />
        </View>
    )
}


function AddItems() {
// the Add Item screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={text_styles.smallTitle}>Search</Text>
            <TextInput
                style={search}
                placeholder='Search for an item'
            />

            <SuggestionList />
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