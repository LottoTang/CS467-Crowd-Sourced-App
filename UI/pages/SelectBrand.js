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

import styles, {text_styles, add_button} from '../style.js';
import CheckList from '../components/CheckList.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';


function SelectBrand({route}) {
// the Select Brand screen itself with its components
    const {product} = route.params;

    const state = useSelector(state=>state.allItems);
    const brands = getBrandsList(product, state);

    // for the page title, capitalize the first letter of the item
    const words = product.split(" ");
    let item_name = ''
    for (const word of words) {
        const letter = word[0].toUpperCase()
        item_name = item_name.concat(letter, word.slice(1, word.length), " ")
    };

    const navigation = useNavigation();
    const handlePress = ()=>{
        navigation.navigate('Home');
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={brand_style.title}>{item_name}</Text>

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