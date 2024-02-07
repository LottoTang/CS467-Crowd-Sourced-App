// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// function imports
import { getSelectedBrandsForProduct, getItemsList, getItemSorting } from '../../redux/funtionality/helperFunctions';
import { capitalizeTitle } from '../ui_helpers.js'
import { deleteItemInShoppingList } from '../../redux/actions/actions.js';

// data imports
import { stores } from '../../testData/testingData2.js';

// component imports
import StoresList from '../components/StoresWithItem.js'
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {text_styles, add_button} from '../style.js';
import Icon from 'react-native-vector-icons/Feather';


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selectedItem);

    const allItems = useSelector(state => state.allItems);
    const shoppingList = useSelector(state => state.shoppingList);

    const item_ids = shoppingList[product]
    const items = getItemsList(item_ids, allItems)

    const selected_brands = getSelectedBrandsForProduct(items);

    const [ranking, setRanking] = useState("price");
    const rankedData = getItemSorting(items, ranking, stores);

    if (!product) {
        return <Text>No product selected</Text>;
    }

    const navigation = useNavigation();
    const dispatch = useDispatch();

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
        setRanking(selection.value)
        setPopup(false)
    }

    // Delete item from shopping list
    const handleDeleteItem = () =>{
        dispatch(deleteItemInShoppingList(product));
        navigation.navigate("Home");
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={view_style.title}>{capitalizeTitle(product)}</Text>
            <PopupModal popup={popup} popup_vals={popup_vals} closePopup={closePopup} />

            <Pressable onPress={()=> handleDeleteItem()}>
                <Text style={view_style.testDelete}>Delete Item</Text>
            </Pressable>

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
                <StoresList items={rankedData}/>
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
    testDelete: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 250
    }
});