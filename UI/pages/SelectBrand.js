import React from 'react';
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addItemInShoppingList } from '../../redux/actions/actions.js';

import styles, {text_styles, add_button} from '../style.js';
import CheckList from '../components/CheckList.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'


function SelectBrand({route}) {
// the Select Brand screen itself with its components
    let {product, preselected} = route.params;
    if (preselected == null) preselected = []

    const [selected_brands, setSelectedItems] = useState(preselected)

    // TODO: const brands = getBrandsList(product), where func retrieves from database
    const brands = getBrandsList(product, useSelector(state=>state.allItems));

    // Set up connection with store to dispatch signal
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const handlePress = ()=>{
        // TODO: replace dispatch function with function that accesses database
        dispatch(addItemInShoppingList(product, selected_brands));
        navigation.navigate('Home');
    }

    // params to be passed to the CheckList
    const data = [brands, "brand", selected_brands, setSelectedItems]
    
    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={brand_style.title}>{capitalizeTitle(product)}</Text>

            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <View  style={{maxHeight: '62%'}}>
                <CheckList data={data} />
            </View>

            <View style={styles.bottom}>
                <Text
                        style={addButton}
                        onPress={() => handlePress()}>
                    +
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default SelectBrand;


const brand_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
    addButton: {
        margin: 6,
        marginTop: 12,

        alignSelf: 'flex-end',
    },
});

const addButton = add_button.concat(brand_style.addButton);