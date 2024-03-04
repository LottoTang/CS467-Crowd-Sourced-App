// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// function imports
import { getUniqueStoreNames } from '../../redux/funtionality/helperFunctions.js';

// data imports
import { fetchStores } from '../../redux/funtionality/connectionMongo.js';
import { makeLiveFeedPost, updateLastPostDateForUser, increaseItemCount } from '../../redux/funtionality/postPatchFunctions.js';

// component imports
import Dropdown from '../components/Dropdown.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';

function PostPage() {
// the Post page screen itself with its components (allows the user to post to the live feed)
    const user = useSelector(state => state.user);

    const [store, setStore] = useState();
    const [review, setReview] = useState();
    const [storesDropdown, setStoresDropdown] = useState([]);
    const [dataReceived, setDataReceived] = useState(false);
    const [storeID, setStoreID] = useState("");

    const navigation = useNavigation();

    // Get all stores from database
    useEffect(()=>{

        // Capture unique stores 
        let storeDetails = [];

        const populateStores = async()=>{
            const response = await fetchStores();
            storeDetails = getUniqueStoreNames(response);
            setStoresDropdown(storeDetails);
            setDataReceived(true);
        }

        populateStores();

    }, []);

    // Get the store ID for submitting a message 
    useEffect(()=>{
        if (store){
            const index = store.indexOf("-");
            const id = store.substring(index + 1);
            setStoreID(id);
        }
    }, [store])

    if (!dataReceived){
        return (<Text>Loading...</Text>)
    }
    
    const handlePost = () => {
        if (store == undefined) Alert.alert("Invalid Store", "Please select a store.", [{text: 'Ok'}] );
        else if (review == undefined) Alert.alert("Invalid Update", "Please write an update.", [{text: 'Ok'}] );
        else {
            // Send post to backend live feeds
            makeLiveFeedPost(null, storeID, review);

            // Update latest post date and feed count for the user
            updateLastPostDateForUser(user._id, new Date());
            increaseItemCount(user._id);
            
            setStore();
            setReview();

            navigation.navigate("LiveFeed")
        }
    }

    const available_stores = []
    for (let store_count in storesDropdown){
        const store = storesDropdown[store_count];
        if (store.city == user.city && store.state == user.state) available_stores.push(store.name + " -" + store._id);
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>

            <Text style={text_styles.smallTitle}>Store</Text>
            <Dropdown value={store} setValue={setStore} options={available_stores} type={"store"}/>

            <Text style={text_styles.smallTitle}>Update</Text>
            <View style={item_style.concat({marginBottom: 15})}>
                <TextInput
                    style={text_styles.inputText}
                    value={review}
                    onChangeText={setReview}
                    multiline={true}
                    textAlignVertical={"top"}
                    numberOfLines={3}
                    maxLength={64}
                />
            </View>

            <Text style={[add_button, post_style.addButton]} onPress={handlePost}>
                +
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default PostPage;


const post_style = StyleSheet.create({
    addButton: {
        margin: 6,
        marginTop: 20,
        alignSelf: 'flex-end',
    }
});