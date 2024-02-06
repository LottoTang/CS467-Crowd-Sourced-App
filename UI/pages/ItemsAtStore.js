import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles, {item_style, text_styles, add_button} from '../style.js';
import { useDispatch, useSelector } from 'react-redux';
import { viewSelectedItem } from '../../redux/actions/actions.js';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeItemFromArray } from '../ui_helpers.js'
import { useNavigation } from '@react-navigation/native';


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

function CheckList({data}) {
    item_data = data.splice(3, 2)
    const [items, title, size, setSelected] = data

    const clearSelected = () => {
        // TODO: create function that removes checked off items from list (right now only visual)
        setSelected([])
    };

    return(
        <View>
            { items.length > 0 ? (
            <Text style={text_styles.smallTitle}>{title}</Text>
            ) : null}
            <View  style={{maxHeight: {size}}}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem = { ({item}) =>
                        <ItemComponent item={item} data={item_data} />
                    }
                />
            </View>
            { title == "Checked off" && items.length > 0 ? (
                <Pressable onPress={()=> clearSelected()}>
                    <Text style={addButton}>Clear</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

function ItemsAtStore() {
// the View Items at Specified Store screen itself with its components

    const shopping_list = useSelector((state)=> state.shoppingList);
    const products = Object.keys(shopping_list)

    const items_missing = ["tomato juice", "peanuts"]

    const [unselected_products, setUnselectedItems] = useState(products.filter(product => !items_missing.includes(product)))
    const [selected_products, setSelectedItems] = useState([])

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleViewMissing = (item)=>{
        dispatch(viewSelectedItem(item));
        navigation.navigate('View Item');
    };

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

    list_data_1 = [items_missing, "Items Missing at this Store", '40%', null, handleViewMissing]
    list_data_2 = [unselected_products, "Shopping List", '90%', false, handleSelect]
    list_data_3 = [selected_products, "Checked off", '90%', true, handleSelect, setSelectedItems]

    const list_data = [list_data_1, list_data_2, list_data_3]

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container} >
            <FlatList
                data={[0, 1, 2]}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <CheckList data={list_data[item]} />
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
   },
});



const addButton = add_button.concat(store_items_style.addButton);