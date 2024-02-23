// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// function imports
import { getShoppingListItemsInStore, getProductInShoppingListDetails } from "../../redux/funtionality/helperFunctions";
import { viewSelectedItem, deleteItemInShoppingList } from '../../redux/actions/actions.js';
import { removeItemFromArray } from '../ui_helpers.js';

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item, data}) => {
// item component that contains name of one item and a checkbox
    const [selected, handleSelect] = data

    let icon = "checkbox-blank-outline";
    if (selected) icon = "checkbox-marked";
    let size = 26
    if (selected == null) size = 0

    return (
        <Pressable style={item_style} onPress={() => handleSelect(item, !selected)}>
            <Text style={text_styles.itemText}>
                {item}
            </Text>
            <Icon
                name={icon}
                size={size}
                color={styles.secondaryItemBackground.color}
                style={{alignSelf: 'center'}}
            />
        </Pressable>
    );
};


function ItemsAtStore({route}) {
// the View Items at Specified Store screen itself with its components
    const store = route.params.store

    const shopping_list = useSelector(state => state.shopping_list);
    const all_items = useSelector(state => state.all_items);
    const all_stores = useSelector(state => state.all_stores);

    // collect dictionary of items available/missing
    const breakdown_items = getShoppingListItemsInStore(shopping_list, store.name, all_items, all_stores);
    const items_found = breakdown_items.items_available;
    const items_missing = breakdown_items.items_missing;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleViewMissing = (item)=>{
        dispatch(viewSelectedItem(item));
        navigation.navigate('View Item', {deletable: true, product: item});
    };


    const [unselected_products, setUnselectedItems] = useState(items_found)
    const [selected_products, setSelectedItems] = useState([])

    const handleSelect = (item, isSelected) => {
        if (isSelected) {
            setUnselectedItems(removeItemFromArray(item, unselected_products))

            const array = selected_products.slice()
            array.push(item)
            setSelectedItems(array)
        } else {
            setSelectedItems(removeItemFromArray(item, selected_products))

            const array = unselected_products.slice()
            array.push(item)
            setUnselectedItems(array)
        }
    }

    const clearSelected = () => {
        for (const product of selected_products){
            dispatch(deleteItemInShoppingList(product));
        }
        setSelectedItems([])
    };


    const list_data = [
        {
            title: `Items Missing at ${store.name}`,
            data: items_missing,
            selected: null,
            func: handleViewMissing
        },
        {
            title: "Shopping List",
            data: unselected_products,
            selected: false,
            func: handleSelect
        },
        {
            title: "Checked off",
            data: selected_products,
            selected: true,
            func: handleSelect
        }
    ]

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container} >
            <SectionList
                sections={list_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item, section}) =>
                    <ItemComponent item={item} data={[section.selected, section.func]} />
                }
                renderSectionHeader={ ({section: {title, data}}) => (
                    <View>
                        { data.length > 0 ? (
                        <Text style={text_styles.smallTitle}>{title}</Text>
                        ) : null}
                    </View>
                )}
                ListFooterComponent={
                    <View>
                        { selected_products.length > 0 ? (
                            <Pressable onPress={()=> clearSelected()} >
                                <Text style={addButton}>Clear</Text>
                            </Pressable>
                        ) : null}
                    </View>
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default ItemsAtStore;


const store_items_style = StyleSheet.create({
   addButton: {
       fontSize: 18,

       margin: 6,

       alignSelf: 'flex-end',

       lineHeight: 20,
       paddingTop: 9,
       height: 29,
   },
});



const addButton = add_button.concat(store_items_style.addButton);