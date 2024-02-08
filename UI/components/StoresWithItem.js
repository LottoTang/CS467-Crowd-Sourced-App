// react imports
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item}) => {
// store component that contains name of the store, brand, price, sale info, and update info

    const stores = useSelector(state => state.all_stores);
    const promotions = useSelector(state => state.all_promotions);

    // TODO: replace this with data from the database; not sure how it's going to be pulled
    const time = "4 hours"
    const user = "shoppingpro50"

    const store = stores[item.store]
    const promotion = promotions[item.promotion]

    let promotion_type = null
    if (promotion) promotion_type = promotion.promotion_type

    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: '65%'}]}>
                <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                    {store.name}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    {item.brand}
                </Text>
                <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                    Last updated {time} ago by {user}
                </Text>
            </View>
            <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                { promotion ? (
                    <Text style={[text_styles.itemText, {paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right'}]}>
                        Sale: {promotion_type}!!
                    </Text>
                ) : null}
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    {item.price.toLocaleString('en', {style: "currency", currency: "USD"})}
                </Text>
            </View>
        </View>
    );
};

const StoresList = ({items}) => {
// list component composed of stores that have the specified item of specified brands

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
});