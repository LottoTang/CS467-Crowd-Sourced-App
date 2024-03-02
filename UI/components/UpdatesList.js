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


const ItemComponent = ({item, stores_only}) => {
// item component that holds either live feed post or item data
    let title, subtitle, time, user, width;
    if (item.pricing != -1){
        title = item.item
        subtitle = item.store
        width = "75%"
    }
    else {
        title = item.review
        subtitle = item.store
        width = "100%"
    }

    time = item.date
    user = item.user

    const promotion = promotions[item.promotion]
    let promotion_type = null
    if (promotion) {
        promotion_type = promotion.promotion_type
        width = "50%"
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
            { item.pricing != -1 ? (
                <View style={{alignSelf: 'center'}}>
                    { promotion ? (
                        <Text style={[text_styles.itemText, {marginTop: 4, paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right', lineHeight: 15}]}>
                            Sale: {promotion_type}!!
                        </Text>
                    ) : null}
                    <Text style={[text_styles.smallTitle, {alignSelf: 'flex-end', lineHeight: 25}]}>
                        {parseFloat(item.pricing).toLocaleString('en', {style: "currency", currency: "USD"})}
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

const UpdatesList = ({items, stores_only=false}) => {
// list component composed of stores where item is found or updates to products and live feed reviews
    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} stores_only={stores_only}/>
                }
            />
        </View>
    );
};

export default UpdatesList;


const view_style = StyleSheet.create({
    largeText: {
        marginLeft: 0,
        marginTop: 8,
        lineHeight: 25,
    },
});