// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// function imports
import { returnLiveFeeds, filterLiveFeeds } from "../../redux/funtionality/helperFunctions";

// data imports
import { stores, products, items, promotions} from "../../testData/testingData2";
import { liveFeed } from "../../testData/liveFeedData";

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, { item_style, text_styles, add_button, popup_style } from '../style.js';

const ItemComponent = ({item}) => {
    const promotion = false
    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: '65%'}]}>
                <Text style={[text_styles.smallTitle, {marginLeft: 0, marginTop: 0}]}>
                    store.name
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    item.brand
                </Text>
                <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                    Last updated "time" ago by "user"
                </Text>
            </View>
            <View style={{alignSelf: 'center', maxWidth: '35%'}}>
                { promotion ? (
                    <Text style={[text_styles.itemText, {paddingBottom: 0, color: styles.headerColor.color, textAlign: 'right'}]}>
                        Sale: promotion_type!!
                    </Text>
                ) : null}
                <Text style={[text_styles.smallTitle, {marginTop: 0, alignSelf: 'flex-end'}]}>
                    item.price
                </Text>
            </View>
        </View>
    );
};

const Popup = () => {
    const [popup, setPopup] = useState(false)

    const popup_vals = [
        {label: "Store", value: "store"},
        {label: "Brand", value: "brand"},
    ]

    const selectFilter = (selection=null) => {
        if (selection.value == "store") setStorePopup(true)
        // else if (selection.value == "brand")
        setPopup(false)
    }

    const [storePopup, setStorePopup] = useState(false)

    const store_vals = []
    for (const store_id in stores){
        store_vals.push(stores[store_id].name)
    }
    const [store_filter, setStores] = useState(store_vals)

    const closeStorePopup = (selected_stores=null) => {
        if (selected_stores != null) {
            let selected = selected_stores
            if (selected_stores.includes("Any store")) selected = store_vals
            setStores(selected)
        }
        setStorePopup(false)
    }

    return (
        <View>
            <PopupModal
                popup={popup}
                popup_type={"Filter"}
                data={popup_vals}
                closePopup={selectFilter} />
            <PopupModal
                popup={storePopup}
                popup_type={"Select"}
                data={store_vals}
                closePopup={closeStorePopup}
                preselected={store_filter}
            />

            <Pressable style={[popup_style.selectButton, {marginBottom: 4}]} onPress={() => setPopup(true)}>
                <Text style={[add_button, {fontSize: 13}]}>Filter</Text>
            </Pressable>
        </View>
    )
}


function LiveFeed() {
// the Live Feed page screen itself with its components

    const [filter, setFilter] = useState({metric: "all", store: "all", user_id: "all", brand: "all"});
    const [labels, setLabels] = useState({store: "All Stores", user: "All Users", brands:"All Brands"});

    const feedData = returnLiveFeeds(liveFeed, stores, items, products);
    const [updatedData, setUpdatedData] = useState(feedData);

    const handleFilter = (data) =>{
        setFilter(prevFilter => ({...prevFilter,
            metric: data.metric,
            store: data.store,
            user_id: data.user_id,
            brand: data.brand}));
        setLabels(data.label);

        const newData = filterLiveFeeds(feedData, data);
        setUpdatedData(newData);
    }

    const navigation = useNavigation();

    const makeAPost = () =>{
        navigation.navigate("MakePost");
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Popup />
            <FlatList
                data={updatedData}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default LiveFeed;


const feed_style = StyleSheet.create({
});
