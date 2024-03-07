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
import { getPromotion } from '../../redux/funtionality/connectionMongo.js';

// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item, stores_only}) => {
// item component that holds either live feed post or item data
    let title, subtitle, width;
    if (item.pricing != -1){
        title = item.item
        subtitle = item.store
        width = 65
    }
    else {
        title = item.review
        subtitle = item.store
        width = 100
    }

    const promotion_id = item.promotion
    const [promotion, setPromotion] = useState()

    useEffect(() => {
        fetchData = async () => {
            if (promotion_id) {
                const promo = await getPromotion(promotion_id)
                setPromotion(promo.promotion_type)
            }
        }
        fetchData()
    }, [item])

    const user = item.user.split(" - ")

    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: `${width}%` }]}>
                <Text style={[text_styles.smallTitle, view_style.largeText]}>
                    {title}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0, lineHeight: 15}]}>
                    {subtitle}
                </Text>
                <View style={[styles.row, {justifyContent: "flex-start"}]} >
                    <Text style={[text_styles.footnote, {paddingTop: 0, marginRight: 2}]}>
                        Last updated {item.date} by
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
            { item.pricing != -1 ? (
                <View style={{alignSelf: 'center', maxWidth: `${100-width}%` }}>
                    { promotion_id ? (
                        <Text style={[text_styles.itemText, {marginTop: 4, paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right', lineHeight: 15}]}>
                            Sale: {promotion}!!
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
    number: {
        fontSize: 9,
        color: styles.textColor.color,
        fontFamily: 'Ultra-Regular',
        lineHeight: 6,

        borderWidth: 1.5,
        borderRadius: 20,
        borderColor: styles.textColor.color,

        paddingLeft: 3.5,
        paddingTop: 6,

        height: 13,
        width: 13,
        marginRight: 1
    },
});