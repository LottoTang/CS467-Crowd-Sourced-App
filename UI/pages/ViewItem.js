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
import StoresList from '../components/StoresWithItem.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selectedItem);

    const brandOptions = useSelector(state => state.allItems);

    const brands = getBrandsList(product.name, brandOptions);
    // TODO: get this data from the database or state, a list of only brands that were previously selected
    const selectedBrands = ["Barilla", "Rao's"]

    if (!product) {
        return <Text>No product selected</Text>;
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={view_style.title}>{capitalizeTitle(product.name)}</Text>

            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <View  style={{height: '26%', marginBottom: 71}}>
                <CheckList items={brands} type="brand" />
            </View>
            <Text style={text_styles.smallTitle}>Store(s):</Text>
            <View style={{height: '40%'}}>
                <StoresList product={product} brands={selectedBrands} />
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