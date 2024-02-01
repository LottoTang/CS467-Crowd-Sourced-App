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

import styles, {item_style, text_styles, add_button, popup_style} from '../style.js';
import CheckList from '../components/CheckList.js'
import StoresList from '../components/StoresWithItem.js'

import { getBrandsList } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selectedItem);

    const brandOptions = useSelector(state => state.allItems);

    const brands = getBrandsList(product.name, brandOptions);
    // TODO: get this data from the database or state, a list of only brands that were previously selected
    const selected_brands = ["Barilla", "Rao's", "Brand2", "Brand5"]

    if (!product) {
        return <Text>No product selected</Text>;
    }

    const navigation = useNavigation();

    const handleEditItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item, preselected: selected_brands});
    };

    const [popup, setPopup] = useState(false)
    const closePopup = (selection=null) => {
        // if (selection)... TODO: add code for sorting here
        setPopup(false)
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={view_style.title}>{capitalizeTitle(product.name)}</Text>

            <Modal
                animationType="slide"
                visible={popup}
                transparent={true}
                onRequestClose={() => closePopup()}
            >
                <View style={popup_style.background}>
                    <View style={popup_style.style}>
                        <Text style={text_styles.smallTitle}>Sort by:</Text>
                        <Pressable style={item_style} onPress={() => closePopup("Price")} >
                            <Text style={text_styles.itemText}>Price</Text>
                        </Pressable>
                        <Pressable style={item_style} onPress={() => closePopup("Store")} >
                            <Text style={text_styles.itemText}>Store</Text>
                        </Pressable>
                        <Pressable style={item_style} onPress={() => closePopup("Brand")} >
                            <Text style={text_styles.itemText}>Brand</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{marginRight: 10}}>
                <View style={styles.row}>
                    <Text style={text_styles.smallTitle}>Brands Selected:</Text>
                    <Pressable style={{alignSelf: 'center'}} onPress={() => handleEditItem(product.name)}>
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
                <StoresList product={product} brands={selected_brands} />
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