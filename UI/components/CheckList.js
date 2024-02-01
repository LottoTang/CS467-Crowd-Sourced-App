import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, {item_style, text_styles,} from '../style.js';


const ItemComponent = ({item, func=() => {}}) => {
// item component that contains name of one item and a checkbox
    const [selected, setSelected] = useState(false);
    const [icon, setIcon] = useState("checkbox-blank-outline");

    const handleSelectItem = (item) => {
        setSelected(!selected)
    };

    useEffect(() => {
        func(selected)
        if (selected) setIcon("checkbox-marked")
        else setIcon("checkbox-blank-outline")
    }, [selected]);

    return (
        <Pressable style={item_style} onPress={() => handleSelectItem()}>
            <Text style={text_styles.itemText}>
                {item}
            </Text>
            <Icon
                name={icon}
                size={26}
                color={styles.secondaryItemBackground.color}
                style={{alignSelf: 'center'}}
            />
        </Pressable>
    );
};

const CheckList = ({items, type="product"}) => {
// list component composed of items with a checkbox
    const [anyItem, setAny] = useState(false);

    let showAny = true;
    if (type == "product") showAny = false;

    return (
        <View>
            { showAny ? (
                <ItemComponent item={`Any ${type}`} func={setAny} />
            ) : null}
            <FlatList
                data={items}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
            { anyItem ? (
                <View style={check_style.greyed}></View>
            ) : null}
        </View>
    );
};

export default CheckList;


const check_style = StyleSheet.create({
    greyed: {
        height: '85%',

        position: 'absolute',
        left: 0,
        right: 0,
        top: 60,

        backgroundColor: 'rgba(210,219,219,.6)',
    },
});