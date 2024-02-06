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

// function imports
import { getGoShoppingList, getStoresSorting } from "../../redux/funtionality/helperFunctions";

// data imports
import { items, stores } from "../../testData/testingData2";

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js'


const ItemComponent = ({store, list_len}) => {
// store component that contains name of the store, number of items found, and total cost
    const navigation = useNavigation();
    const handleStore = ()=>{
        navigation.navigate("View Items at Store", {store: store});
    }

    return (
        <Pressable style={[item_style]} onPress={()=>handleStore() } >
            <View style={[styles.wide_row, {alignSelf: 'center'}]}>
                <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                    {store.name}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    {store.numItems}/{list_len} of your items found
                </Text>
            </View>
            <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                <Text style={[text_styles.itemText, {paddingBottom: 0, textAlign: 'right'}]}>
                        Minimum Total:
                </Text>
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    {store.totalCost.toLocaleString('en', {style: "currency", currency: "USD"})}
                </Text>
            </View>
        </Pressable>
    );
};

function PopUp({setRanking}) {
    const [popup, setPopup] = useState(false)

    const filter_vals = [
        {label: "Within 10 miles", value: 10},
        {label: "Within 5 miles", value: 5},
        {label: "Within 2 miles", value: 2},
    ]
    const sort_vals = [
        {label: "Price", value: "price"},
        {label: "Items Found", value: "items"},
        {label: "Store", value: "store_name"},
    ]

    const [popup_type, setType] = useState("Sort")
    const [popup_vals, setVals] = useState(sort_vals)

    const openPopup = (type) => {
        if (type == "filter") {
            setType("Filter")
            setVals(filter_vals)
        } else {
            setType("Sort")
            setVals(sort_vals)
        }
        setPopup(true)
    }

    const closePopup = (selection=null) => {
        if (popup_type == "Sort") setRanking(selection.value)
        setPopup(false)
    }

    return (
        <View>
            <PopupModal popup={popup} popup_type={popup_type} popup_vals={popup_vals} closePopup={closePopup}/>

            <View style={[styles.row, {alignSelf: 'flex-end'}]}>
                <Pressable style={{alignSelf: 'flex-end', paddingRight: 10}} onPress={() => openPopup("sort")}>
                    <Text style={[add_button, {fontSize: 13}]}>Sort</Text>
                </Pressable>
            </View>
        </View>
    )
}


function StoreRecs() {
// the Store Recommendation screen itself with its components

    const shoppingList = useSelector(state => state.shoppingList);
    const [ranking, setRanking] = useState("price");

    const storesBreakdown = getGoShoppingList(shoppingList, items, stores);
    const rankedData = getStoresSorting(storesBreakdown, ranking);

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <PopUp setRanking={setRanking}/>
            <FlatList
                data={rankedData}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent store={item} list_len={Object.keys(shoppingList).length}/>
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default StoreRecs;


const rec_style = StyleSheet.create({
});
