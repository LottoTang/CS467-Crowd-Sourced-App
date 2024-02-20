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
import { user, stores, products, items, promotions} from "../../testData/testingData2";
import { liveFeed } from "../../testData/liveFeedData";

// component imports
import UpdatesList from '../components/UpdatesList.js'
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, { item_style, text_styles, add_button, large_button, popup_style } from '../style.js';


const Popup = ({store_filter, setStores, post_filter, setPostTypes, stores}) => {
// Popup component for when user wants to filter live feed data
    const [popup, setPopup] = useState(false)

    const popup_vals = [
        {label: "Store", value: "store"},
        {label: "Post Type", value: "post"},
    ]

    const selectFilter = (selection=null) => {
        if (selection.value == "store") setStorePopup(true)
        if (selection.value == "post") setPostTypePopup(true)
        setPopup(false)
    }

    const [storePopup, setStorePopup] = useState(false)

    const store_names = []
    let preselected_stores = []
    for (const store_id in stores) {
        const store_name = stores[store_id].name
        store_names.push(store_name)
        if (store_filter == "all") preselected_stores.push(store_name)
    }
    if (store_filter != "all") preselected_stores = store_filter

    const closeStorePopup = (selected_stores=null) => {
        if (selected_stores != null) {
            let selected = []
            if (selected_stores.includes("Any store")) selected = "all"
            else selected = selected_stores
            setStores(selected)
        }
        setStorePopup(false)
    }


    const [postTypePopup, setPostTypePopup] = useState(false)

    let preselected_posts = post_filter
    if (post_filter == "all") preselected_posts = ["Item Updates", "Store Reviews"]

    const closePostTypePopup = (selected_posts=null) => {
        if (selected_posts != null) {
            let selected = []
            if (selected_posts.includes("Any post")) selected = "all"
            else selected = selected_posts
            setPostTypes(selected)
        }
        setPostTypePopup(false)
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
                preselected={preselected_stores}
            />
            <PopupModal
                popup={postTypePopup}
                popup_type={"Select"}
                data={["Item Updates", "Store Reviews"]}
                closePopup={closePostTypePopup}
                preselected={preselected_posts}
                select_type={"post"}
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

    const available_stores = {}
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) available_stores[store_id] = store
    }

    const feedData = returnLiveFeeds(liveFeed, available_stores, items, products);
    const [updatedData, setUpdatedData] = useState(feedData);

    const navigation = useNavigation();

    const [store_filter, setStores] = useState("all")
    const [post_filter, setPostTypes] = useState("all")

    useEffect(() => {
        setFilter(prevFilter => ({...prevFilter,
            metric: "stores",
            store: store_filter
        }))
    }, [store_filter])

    useEffect(() => {
        setFilter(prevFilter => ({...prevFilter,
            metric: "posts",
            post: post_filter
        }))
    }, [post_filter])

    useEffect(() => {
        const newData = filterLiveFeeds(feedData, filter);
        setUpdatedData(newData);
    }, [filter])


    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Popup store_filter={store_filter} setStores={setStores} post_filter={post_filter} setPostTypes={setPostTypes} stores={available_stores}/>
            <View style={{height: '84%'}}>
                <UpdatesList items={updatedData}/>
            </View>
            <Text style={[add_button, feed_style.addButton]} onPress={()=>navigation.navigate("Post Page")}>
                +
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default LiveFeed;


const feed_style = StyleSheet.create({
    addButton: {
        alignSelf: "flex-end",
        marginRight: 10,
        marginTop: 6,
    },
});
