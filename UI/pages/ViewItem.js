import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import styles, {item_style, text_styles, add_button} from '../style.js';
import StoresList from '../components/StoresWithItem.js'
import PopupModal from '../components/PopupModal.js'
import { getSelectedBrandsForProduct, getItemsList } from '../../redux/funtionality/helperFunctions';
import { getBrandsList, getItemSorting } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'
import { stores } from '../../testData/testingData2.js';


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selectedItem);

    const allItems = useSelector(state => state.allItems);
    const shoppingList = useSelector(state => state.shoppingList);

    const item_ids = shoppingList[product]
    const items = getItemsList(item_ids, allItems)

    const selected_brands = getSelectedBrandsForProduct(items);
    //let sortedResult = getItemSorting(items, "Price");
    const [sortedResult, setSortedResult] = useState(getItemSorting(items, "Price", stores));

    if (!product) {
        return <Text>No product selected</Text>;
    }

    const navigation = useNavigation();

    const handleEditItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item, preselected: selected_brands});
    };

    const [popup, setPopup] = useState(false)

    const popup_vals = [
        {label: "Price", value: "price"},
        {label: "Store", value: "store"},
        {label: "Brand", value: "brand"},
    ]

    const closePopup = (selection=null) => {
        // if (selection)... TODO: add code for sorting here
        setPopup(false)
        const newSortedList = getItemSorting(items, selection, stores);
        setSortedResult(newSortedList);
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={view_style.title}>{capitalizeTitle(product)}</Text>
            <PopupModal popup={popup} popup_vals={popup_vals} closePopup={closePopup} />

            <View style={{marginRight: 10}}>
                <View style={styles.row}>
                    <Text style={text_styles.smallTitle}>Brands Selected:</Text>
                    <Pressable style={{alignSelf: 'center'}} onPress={() => handleEditItem(product)}>
                        <Icon
                            name={"edit"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                    </Pressable>
                </View>
                <FlatList
                    data={selected_brands}
                    horizontal={true}
                    style={styles.horizontalList}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem = { ({item}) =>
                        <Text style={text_styles.itemText}>{item}    </Text>
                    }
                />
                <View style={[styles.row, {marginTop: 12}]}>
                    <Text style={text_styles.smallTitle}>Store(s):</Text>
                    <Pressable style={{alignSelf: 'flex-end'}} onPress={() => setPopup(true)}>
                        <Text style={[add_button, {fontSize: 13}]}>Sort</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{height: '70%'}}>
                <StoresList items={sortedResult}/>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default ViewItem;


const view_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
});