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
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// data imports
import { user, stores } from "../../testData/testingData2";
import axios from 'axios';

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';

function PostPage() {
// the Post page screen itself with its components (allows the user to post to the live feed)

    const [store, setStore] = useState();
    const [review, setReview] = useState();

    const navigation = useNavigation();

    const handlePost = () => {
        if (store == undefined) Alert.alert("Invalid Store", "Please select a store.", [{text: 'Ok'}] );
        else if (review == undefined) Alert.alert("Invalid Update", "Please write an update.", [{text: 'Ok'}] );
        else {
            // Handle form submission here, you can send the data to a backend or perform any other action.
            const fetchData = async () => {
                try {
                    //const response = await axios.post(`https://localhost:3000/products`);
                    //const result = await response.json();
                    //console.log(result);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();

            setStore();
            setReview();
            navigation.navigate("LiveFeed")
        }
    }


    const [popup, setPopup] = useState(false)

    const available_stores = []
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) available_stores.push({label: store.name, value: store_id})
    }

    const closePopup = (selection=null) => {
        if (selection != null) setStore(selection.value)
        setPopup(false)
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>

            <PopupModal
                popup={popup}
                popup_type={"Dropdown"}
                data={available_stores}
                closePopup={closePopup}
            />
            <Text style={text_styles.smallTitle}>Store</Text>
            <Pressable style={item_style.concat({marginBottom: 15})} onPress={() => setPopup(true)}>
                {stores[store] ? (
                    <Text style={text_styles.inputText}>{stores[store].name}</Text>
                ) : (
                    <Text style={text_styles.placeholder}>Select a store</Text>
                )}
            </Pressable>

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