// react imports
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// function imports
import { convertDateForPosts } from '../../redux/funtionality/helperFunctions.js';

// style imports
import styles, {item_style, text_styles,} from '../style.js';


const ItemComponent = ({item}) => {
// item component that holds either live feed post or item data
    const title = item.store;
    const subtitle = item.name

    let user = [item.username, 1];
    if (item.username) user = item.username.split(" - ")

    const date = convertDateForPosts(new Date(item.date))

    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: '65%'}]}>
                <Text style={[text_styles.smallTitle, view_style.largeText]}>
                    {title}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0, lineHeight: 15}]}>
                    {subtitle}
                </Text>
                <View style={[styles.row, {justifyContent: "flex-start"}]} >
                    <Text style={[text_styles.footnote, {paddingTop: 0, marginRight: 2}]}>
                        Last updated {date} by
                    </Text>
                    <View style={[styles.row, {justifyContent: "flex-start"}]} >
                        <Text style={view_style.number}>
                            {user[1]}
                        </Text>
                        <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                            {user[0]}
                        </Text>
                    </View>
                </View>
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
    number: {
        fontSize: 9,
        color: styles.textColor.color,
        fontFamily: 'Ultra-Regular',
        lineHeight: 6,

        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: styles.textColor.color,

        textAlign: "center",
        paddingTop: 6.25,

        height: 13,
        width: 13,
        marginRight: 1
    },
});