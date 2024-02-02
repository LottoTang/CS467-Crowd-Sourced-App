import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBrandItem, dropSelectedBrand } from '../../redux/actions/actions.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles, {item_style, text_styles,} from '../style.js';


const ItemComponent = ({item, type, func=()=>{}, preselected=false}) => {
// item component that contains name of one item and a checkbox
    const [selected, setSelected] = useState(preselected);
    const [icon, setIcon] = useState("checkbox-blank-outline");
    
    // Set up connection with store to dispatch signal
    const dispatch = useDispatch();

    const handleSelectItem = (item) => {
        setSelected(!selected); 
        if (type == "brand"){
            if (selected == false){
                dispatch(selectBrandItem(item));
            } else {
                dispatch(dropSelectedBrand(item));
            }
        }
    };

    useEffect(() => {
        func(selected)
        if (selected) setIcon("checkbox-marked");
        else setIcon("checkbox-blank-outline");
    }, [selected]);

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

const CheckList = ({items, type="product", preselected=[]}) => {
// list component composed of items with a checkbox
    const [anyItem, setAny] = useState((preselected == `Any ${type}`));

    let showAny = true;
    if (type == "product") showAny = false;

    return (
        <View>
            { showAny ? (
                <ItemComponent item={`Any ${type}`} type={type} func={setAny}
                               preselected={preselected.includes(`Any ${type}`)}/>
            ) : null}
            <FlatList
                data={items}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} type={type} preselected={preselected.includes(item)}/>
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