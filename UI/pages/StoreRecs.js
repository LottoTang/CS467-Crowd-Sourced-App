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
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

// function imports
import { getGoShoppingList, getStoresSorting } from "../../redux/funtionality/helperFunctions";

// data imports
import { items, stores } from "../../testData/testingData2";

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {item_style, text_styles, add_button, popup_style} from '../style.js'


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
                    {store.num_items}/{list_len} of your items found
                </Text>
            </View>
            <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                <Text style={[text_styles.itemText, {paddingBottom: 0, textAlign: 'right'}]}>
                        Minimum Total:
                </Text>
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    {store.total_cost.toLocaleString('en', {style: "currency", currency: "USD"})}
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
        if (selection != null) {
            if (popup_type == "Sort") setRanking(selection.value)
        }
        setPopup(false)
    }

    return (
        <View>
            <PopupModal popup={popup} popup_type={popup_type} data={popup_vals} closePopup={closePopup}/>

            <View style={[styles.row, {alignSelf: 'flex-end'}]}>
                <Pressable style={{alignSelf: 'flex-end', paddingRight: 10}} onPress={() => openPopup("sort")}>
                    <Text style={[add_button, popup_style.buttonText]}>Sort</Text>
                </Pressable>
            </View>
        </View>
    )
} 


function StoreRecs() {
// the Store Recommendation screen itself with its components
    const user = useSelector(state => state.user);
    const [allItems, setAllItems] = useState([]);
    const [allStores, setAllStores] = useState([]);
    const [itemsReceived, setItemsReceived] = useState(false);
    const [storesReceived, setStoresReceived] = useState(false);

    const shopping_list = useSelector((state)=> state.user.shopping_list_item);
    const [ranking, setRanking] = useState("items");

    // Get stores and all items from database
    useEffect(() => {
        // capture all tags in the shopping list
        const tags = Object.keys(shopping_list);
    
        // Get stores and all items from database
        const fetchData = async () => {
            try {
                const itemsPromises = tags.map(async (tag) => {
                    const response = await axios.get(`http://10.0.2.2:3000/items/`, {
                        params: {
                            tag: `${tag}`,
                        }
                    });
                    return response.data;
                });
                const itemsData = await Promise.all(itemsPromises);
                setAllItems(itemsData);
                setItemsReceived(true);
    
                const storesResponse = await axios.get(`http://10.0.2.2:3000/stores`);
                setAllStores(storesResponse.data);
                setStoresReceived(true);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [shopping_list]);

    // Ensure we have data from the database
    if (!storesReceived || !itemsReceived){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }



    //const stores_breakdown = getGoShoppingList(shopping_list, items, stores, user.city, user.state);
    const stores_breakdown = getGoShoppingList(shopping_list, allItems, allStores, user.city, user.state);
    const ranked_data = getStoresSorting(stores_breakdown, ranking);

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <PopUp setRanking={setRanking}/>
            <FlatList
                data={ranked_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent store={item} list_len={Object.keys(shopping_list).length}/>
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default StoreRecs;


const rec_style = StyleSheet.create({
});
