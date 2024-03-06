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
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// function imports
import { returnLiveFeeds, filterLiveFeeds, sortLiveFeeds } from "../../redux/funtionality/helperFunctions";

// data imports
import { fetchStores, searchStores, getAllLiveFeeds, fetchItems, fetchProduct } from '../../redux/funtionality/connectionMongo.js';

// component imports
import UpdatesList from '../components/UpdatesList.js'
import PopupModal from '../components/PopupModal.js'
import Loading from '../components/LoadingPage.js'

// style imports
import styles, { item_style, text_styles, add_button, large_button, popup_style } from '../style.js';

 
const Popup = ({store_filter, setStores, post_filter, setPostTypes, stores}) => {
// Popup component for when user wants to filter live feed data
    const [popup, setPopup] = useState(false)

    const popup_vals = ["Store", "Post Type"]

    const selectFilter = (selection=null) => {
        if (selection != null){
            if (selection == "Store") setStorePopup(true)
            if (selection == "Post Type") setPostTypePopup(true)
        }
        setPopup(false)
    }

    const [storePopup, setStorePopup] = useState(false)

    const store_names = []
    let preselected_stores = []
    for (const store_id in stores) {
        const store_name = stores[store_id].name
        store_names.push(store_name)
    }
    if (store_filter != "all") preselected_stores = store_filter
    else preselected_stores = ["Any store"]

    const closeStorePopup = (selected_stores=null) => {
        if (selected_stores != null) {
            let selected = []
            if (selected_stores.includes("Any store")) selected = "all"
            else selected = selected_stores
            setStores(selected)
        }
        setStorePopup(false)
    }

    // search functionality for the stores"
    const [search, setSearch] = useState('');
    const [suggested_items, setSuggestedItems] = useState(store_names);

    // when the search text changes, call search stores and update list of options
    useEffect(() =>{
        const getData = async ()=> {
            let data = await searchStores(search)
            setSuggestedItems(data)
        }
        getData();
    }, [search]);


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
                popup_type={["Searchable", "Select"]}
                data={suggested_items}
                closePopup={closeStorePopup}
                preselected={preselected_stores}
                search={search}
                setSearch={setSearch}
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
    const user = useSelector(state => state.user);
    const shoppingList = useSelector(state=> state.user.shopping_list_item);
    const [updatedData, setUpdatedData] = useState([]);
    const [storesList, setStoresList] = useState();
    const [allItemData, setAllItemData] = useState();
    const [allStoreData, setAllStoreData] = useState();
    const [allProductData, setAllProductData] = useState();
    const [allFeedData, setAllFeedData] = useState();
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({metric: "all", store: "all", post: "all"});

    // Collect all data from database
    useEffect(()=>{
        
        const collectData = async () =>{
            const feedsData = await getAllLiveFeeds();
            const storesData = await fetchStores();
            const allItems = {};
            const allProducts = {};
            const allStores = {};
            const allFeeds = {};

            // populate store data
            for (let store in storesData){
                allStores[storesData[store]._id] = storesData[store];
            }
            setAllStoreData(allStores);

            // populate feeds data
            for (let feed in feedsData){
                allFeeds[feedsData[feed]._id] = feedsData[feed];
            }
            setAllFeedData(allFeeds);


            // Get all items in shopping list and products in shopping list
            for (let item in shoppingList){

                // get item details
                const itemData = await fetchItems(item);
                for (let value in itemData){
                    allItems[itemData[value]._id] = itemData[value];
                }

                // get product details
                const productData = await fetchProduct(item);
                allProducts[productData._id] = productData;
                
            } 
            setAllItemData(allItems);
            setAllProductData(allProducts);
            
            const result = returnLiveFeeds(allFeeds, allStores, allItems, allProducts);
            const finalData = sortLiveFeeds(result)
            setUpdatedData(finalData);
            
            // Populate stores for filter
            const filterStore = {};
            for (let store in allStores){
                if (allStores[store].city == user.city && allStores[store].state == user.state){
                    filterStore[allStores[store]._id] = {
                        city: allStores[store].city,
                        name: allStores[store].name,
                        state: allStores[store].state,
                    };
                }
            }
            setStoresList(filterStore);

            setLoading(false);
        }

        collectData();
        

    },[isFocused]); 
    

    //const feedData = returnLiveFeeds(liveFeed, available_stores, items, products);
    //const [updatedData, setUpdatedData] = useState(feedData);
    // Populate data with latest info from database
    const available_stores = storesList;

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
        // Recreate the copy feeds to avoid permanent change in the data
        const copyFeeds = returnLiveFeeds(allFeedData, allStoreData, allItemData, allProductData);
        const newData = filterLiveFeeds(copyFeeds, filter);
        const finalData = sortLiveFeeds(newData)
        setUpdatedData(finalData);
    }, [filter])

    // Wait for data from database to load
    if (loading) {
        return <Loading />
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Popup store_filter={store_filter} setStores={setStores} post_filter={post_filter} setPostTypes={setPostTypes} stores={available_stores}/>
            <View style={{flex: 8}}>
                <UpdatesList items={updatedData}/>
            </View>
            <View style={styles.bottom}>
                <Text style={[add_button, feed_style.addButton]} onPress={()=>navigation.navigate("Post Page")}>
                    +
                </Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default LiveFeed;


const feed_style = StyleSheet.create({
    addButton: {
        alignSelf: "flex-end",
        marginRight: 10,
    },
});
