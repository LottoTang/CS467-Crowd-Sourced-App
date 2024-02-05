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
import { useState } from 'react';
import styles, {item_style, text_styles, add_button, popup_style} from '../style.js';
import { useSelector } from 'react-redux';


const ItemComponent = ({store_id, allStores}) => {
// store component that contains name of the store, number of items found, and total cost

    const store = allStores[store_id]

    const items_found = 5;
    const list_length = 6;
    const total = 20.57

    return (
        <View style={[item_style]}>
            <View style={[styles.wide_row, {alignSelf: 'center'}]}>
                <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                    {store.name}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    {items_found}/{list_length} of your items found
                </Text>
            </View>
            <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                <Text style={[text_styles.itemText, {paddingBottom: 0, textAlign: 'right'}]}>
                        Minimum Total:
                </Text>
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    {total.toLocaleString('en', {style: "currency", currency: "USD"})}
                </Text>
            </View>
        </View>
    );
};

function PopUp() {
    const [popup, setPopup] = useState(false)

    const filter_vals = ["Distance"]
    const sort_vals = ["Items Found", "Total"]

    const [popupType, setType] = useState("Sort")
    const [popupVals, setVals] = useState(sort_vals)

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
        // if (selection)... TODO: add code for sorting here
        setPopup(false)
    }

    return (
        <View>
            <Modal
                animationType="slide"
                visible={popup}
                transparent={true}
                onRequestClose={() => closePopup()}
            >
                <View style={popup_style.background}>
                    <View style={popup_style.style}>
                        <Text style={text_styles.smallTitle}>{popupType} by:</Text>
                        <FlatList
                            data={popupVals}
                            keyExtractor={(item, index)=> index.toString()}
                            renderItem = { ({item}) =>
                                <Pressable style={item_style} onPress={() => closePopup({item})} >
                                    <Text style={text_styles.itemText}>{item}</Text>
                                </Pressable>
                            }
                        />
                    </View>
                </View>
            </Modal>

            <View style={[styles.row, {alignSelf: 'flex-end'}]}>
                <Pressable style={{alignSelf: 'flex-end', paddingRight: 10}} onPress={() => openPopup("filter")}>
                    <Text style={[add_button, {fontSize: 13}]}>Filter</Text>
                </Pressable>
                <Pressable style={{alignSelf: 'flex-end', paddingRight: 10}} onPress={() => openPopup("sort")}>
                    <Text style={[add_button, {fontSize: 13}]}>Sort</Text>
                </Pressable>
            </View>
        </View>
    )
}


function StoreRecs() {
// the Store Recommendation screen itself with its components

    const stores = useSelector(state => state.allStores);

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <PopUp />
            <FlatList
                data={Object.keys(stores)}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent store_id={item} allStores={stores}/>
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default StoreRecs;


const rec_style = StyleSheet.create({
});
