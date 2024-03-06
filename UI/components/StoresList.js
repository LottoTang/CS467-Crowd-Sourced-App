// react imports
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';

// data imports
import { stores, products, items, promotions} from "../../testData/testingData2";


// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item}) => {
// item component that holds either live feed post or item data
    const title = item.store;
    const subtitle = item.name

    let width = "75%"

    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: width}]}>
                <Text style={[text_styles.smallTitle, view_style.largeText]}>
                    {title}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0, lineHeight: 15}]}>
                    {subtitle}
                </Text>
                <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                    Last updated {item.date} by {item.username}
                </Text>
            </View>
            { item.price ? (
                <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                    { item.promotion ? (
                        <Text style={[text_styles.itemText, {marginTop: 4, paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right', lineHeight: 15}]}>
                            Sale: {item.promotion}!!
                        </Text>
                    ) : null}
                    <Text style={[text_styles.smallTitle, {alignSelf: 'flex-end', lineHeight: 25}]}>
                        {item.price.toLocaleString('en', {style: "currency", currency: "USD"})}
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

const StoresList = ({items}) => {
// list component composed of stores where item is found or updates to products and live feed reviews
    return (
        <View>
            <FlatList
                data={items}
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
    largeText: {
        marginLeft: 0,
        marginTop: 8,
        lineHeight: 25,
    },
});