// react imports
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// data imports
import { stores, products, items, promotions} from "../../testData/testingData2";

// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item}) => {
// item component that holds either live feed post or item data
    const title = stores[item.store].name
    const subtitle = item.name

    let width = "75%"

    // TODO: replace this with data from the database; not sure how it's going to be pulled
    const time = "4 hours"
    const user = "shoppingpro50"

    const promotion = promotions[item.promotion]
    let promotion_type = null
    if (promotion) {
        promotion_type = promotion.promotion_type
        width = "65%"
    }

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
                    Last updated {time} ago by {user}
                </Text>
            </View>
            { item.price ? (
                <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                    { promotion ? (
                        <Text style={[text_styles.itemText, {marginTop: 4, paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right', lineHeight: 15}]}>
                            Sale: {promotion_type}!!
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