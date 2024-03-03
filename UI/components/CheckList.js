// react imports
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// function imports
import { removeItemFromArray } from '../ui_helpers.js'

// style imports
import styles, {item_style, text_styles,} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item, func=()=>{}, selected_items, setSelectedItems}) => {
// item component that contains name of one item and a checkbox
    const [selected, setSelected] = useState(selected_items.includes(item));
    const [icon, setIcon] = useState("checkbox-blank-outline");
    
    // Set up connection with store to dispatch signal
    const dispatch = useDispatch();

    const handleSelectItem = (item) => {
        setSelected(!selected);
        if (!selected) {
            items_copy = selected_items.slice()
            items_copy.push(item)
            setSelectedItems(items_copy)
        }
        else {
            setSelectedItems(removeItemFromArray(item, selected_items));
        }
    };


    useEffect(() => {
        func(selected)
        if (selected) setIcon("checkbox-marked");
        else setIcon("checkbox-blank-outline");
    }, [selected]);

    useEffect(() => {
        setSelected(selected_items.includes(item))
    }, [item])

    return (
        <Pressable style={item_style} onPress={() => handleSelectItem(item)}>
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

const CheckList = ({data, type, selected_items, setSelectedItems}) => {
// list component composed of items with a checkbox

    // preset to false if selected_items != any items
    const [any_item, setAny] = useState((selected_items == `Any ${type}`));

    let showAny = true;
    if (type == "product") showAny = false;

    let color = styles.backgroundColor.color
    if (type == "store" || type == "post") color = "#FEFEFE"
    
    return (
        <View >
            { showAny ? (
                <ItemComponent
                    item={`Any ${type}`}
                    func={setAny}
                    selected_items={selected_items}
                    setSelectedItems={setSelectedItems}
                />
            ) : null}
            <FlatList
                data={data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent
                        item={item}
                        selected_items={selected_items}
                        setSelectedItems={setSelectedItems}
                    />
                }
            />
            { any_item ? (
                <View style={[check_style.greyed, {backgroundColor: `${color}90`}]}></View>
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
    },
});