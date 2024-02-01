import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemInShoppingList, selectBrandItem, dropSelectedBrand } from '../../redux/actions/actions.js';

import styles, {text_styles, add_button} from '../style.js';
import CheckList from '../components/CheckList.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'


function SelectBrand({route}) {
// the Select Brand screen itself with its components
    const {product} = route.params;

    const brands = getBrandsList(product, useSelector(state=>state.allItems));

    // Set up connection with store to dispatch signal
    const dispatch = useDispatch();
    const state = useSelector(state=> state.selectedBrand);

    // for the page title, capitalize the first letter of the item
    const words = product.split(" ");
    let item_name = ''
    for (const word of words) {
        const letter = word[0].toUpperCase()
        item_name = item_name.concat(letter, word.slice(1, word.length), " ")
    };

    const navigation = useNavigation();
    const handlePress = ()=>{
        dispatch(addItemInShoppingList(product, state));
        dispatch(dropSelectedBrand());
        navigation.navigate('Home');
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={brand_style.title}>{capitalizeTitle(product)}</Text>

            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <View  style={{maxHeight: '62%'}}>
                <CheckList items={brands} type="brand" />
            </View>

            <View style={styles.bottom}>
                <Text
                        style={addButton}
                        onPress={() => handlePress()}>
                    +
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default SelectBrand;


const brand_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
    addButton: {
        margin: 6,
        marginTop: 12,

        alignSelf: 'flex-end',
    },
});

const addButton = add_button.concat(brand_style.addButton);