import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, {item_style, text_styles,} from '../style.js';

import {testItemsList} from '../../testData/testingData.js'


const ItemComponent = ({item}) => {
// store component that contains name of the store, brand, price, sale info, and update info

    const time = "4 hours"
    const user = "shoppingpro50"

    return (
        <View style={[item_style]}>
            <View style={[styles.wide_row, {alignSelf: 'center'}]}>
                <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                    {item.store_id}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    {item.brand}
                </Text>
                <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                    Last updated {time} ago by {user}
                </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
                { item.sale ? (
                    <Text style={[text_styles.itemText, {paddingBottom: 0, color: styles.headerColor.color}]}>
                        Sale: {item.sale}!!
                    </Text>
                ) : null}
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    ${item.price}
                </Text>
            </View>
        </View>
    );
};

const StoresList = ({product, brands}) => {
// list component composed of stores that have the specified item of specified brands

    // TODO: replace this with data from the database. For now pulled from testItemsList in testingData.js
    const list_data = []
    for (const item of testItemsList) {
        if (item.name == product.name && brands.includes(item.brand)) {
            list_data.push(item)
        }
    }

    return (
        <View>
            <FlatList
                data={list_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
        </View>
    );
};

export default StoresList;


const view_style = StyleSheet.create({
});