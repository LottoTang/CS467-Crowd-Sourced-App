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
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// function imports
import { returnLiveFeeds, filterLiveFeeds } from "../../redux/funtionality/helperFunctions";

// data imports
import { stores, products, items, promotions} from "../../testData/testingData2";
import { liveFeed } from "../../testData/liveFeedData";

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, { item_style, text_styles, add_button, large_button, popup_style } from '../style.js';

const ItemComponent = ({item}) => {
    let title, subtitle, width;
    if (item.price){
        title = item.store
        subtitle = item.brand
        width = "65%"
    }
    else {
        title = item.review
        subtitle = item.store
        width = "100%"
    }
    return (
        <View style={item_style}>
            <View style={[styles.wide_row, {alignSelf: 'center', maxWidth: width}]}>
                <Text style={[text_styles.smallTitle, feed_style.largeText]}>
                    {title}
                </Text>
                <Text style={[text_styles.itemText, {paddingTop: 0, paddingBottom: 0}]}>
                    {subtitle}
                </Text>
                <Text style={[text_styles.footnote, {paddingTop: 0}]}>
                    Last updated {item.date} ago by {item.user}
                </Text>
            </View>
            { item.price ? (
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
            ) : null}
        </View>
    );
};

const Popup = ({store_filter, setStores}) => {
    const [popup, setPopup] = useState(false)

    const popup_vals = [
        {label: "Store", value: "store"},
    ]

    const selectFilter = (selection=null) => {
        if (selection.value == "store") setStorePopup(true)
        // else if (selection.value == "brand")
        setPopup(false)
    }

    const [storePopup, setStorePopup] = useState(false)

    const store_names = []
    let preselected = []
    for (const store_id in stores) {
        const store_name = stores[store_id].name
        store_names.push(store_name)
        if (store_filter == "all") preselected.push(store_name)
    }
    if (store_filter != "all") preselected = store_filter

    const closeStorePopup = (selected_stores=null) => {
        if (selected_stores != null) {
            let selected = []
            if (selected_stores.includes("Any store")) selected = "all"
            else selected = selected_stores
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
                data={store_names}
                closePopup={closeStorePopup}
                preselected={preselected}
            />

            <Pressable style={[popup_style.selectButton, {marginBottom: 4, marginTop: 6}]} onPress={() => setPopup(true)}>
                <Text style={[add_button, popup_style.buttonText]}>Filter</Text>
            </Pressable>
        </View>
    )
}


function LiveFeed() {
// the Live Feed page screen itself with its components

    const [filter, setFilter] = useState({metric: "all", store: "all", user_id: "all", brand: "all"});

    const feedData = returnLiveFeeds(liveFeed, stores, items, products);
    const [updatedData, setUpdatedData] = useState(feedData);

    const navigation = useNavigation();

    const [store_filter, setStores] = useState("all")

    useEffect(() => {
        setFilter(prevFilter => ({...prevFilter,
            metric: "stores",
            store: store_filter
        }))
    }, [store_filter])

    useEffect(() => {
        const newData = filterLiveFeeds(feedData, filter);
        setUpdatedData(newData);
    }, [filter])


    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Popup store_filter={store_filter} setStores={setStores}/>
            <FlatList
                data={updatedData}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item}) =>
                    <ItemComponent item={item} />
                }
            />
            <Text style={[add_button, feed_style.postButton]} onPress={()=>navigation.navigate("MakePost")}>
                +
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default LiveFeed;


const feed_style = StyleSheet.create({
    largeText: {
        marginLeft: 0,
        marginTop: 8,
        lineHeight: 25,
    },
    postButton: {
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 6,
    },
});
