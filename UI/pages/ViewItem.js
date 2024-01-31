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
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, {item_style, text_styles, add_button} from '../style.js';
import CheckList from '../components/CheckList.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selectedItem);

    const brandOptions = useSelector(state => state.allItems);

    const brands = getBrandsList(product.name, brandOptions);

    if (!product) {
        return <Text>No product selected</Text>;
    }

    // for the page title, capitalize the first letter of the item
    const words = product.name.split(" ");
    let item_name = ''
    for (const word of words) {
        const letter = word[0].toUpperCase()
        item_name = item_name.concat(letter, word.slice(1, word.length), " ")
    };

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={view_style.title}>{item_name}</Text>

            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <View  style={{maxHeight: '30%'}}>
                <CheckList items={brands} type="brand" />
            </View>
        </View>
    </SafeAreaView>
    );
};

export default ViewItem;


const view_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
});