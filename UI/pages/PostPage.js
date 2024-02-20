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
import { stores } from "../../testData/testingData2";

// component imports
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';

function PostPage() {
// the Post page screen itself with its components (allows the user to post to the live feed)

    // TODO: replace with actual user data
    const user = {
        user_id: "1234",
        fullname: "John Doe",
        username: "shoppingpro700",
        city: "Corvallis",
        state: "OR"
    }

    const [store, setStore] = useState();
    const [review, setReview] = useState();

    const navigation = useNavigation();

    const handlePost = () => {
        if (store == undefined) Alert.alert("Invalid Store", "Please select a store.", [{text: 'Ok'}] );
        else if (review == undefined) Alert.alert("Invalid Update", "Please write an update.", [{text: 'Ok'}] );
        else navigation.navigate("LiveFeed")
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

            <PopupModal popup={popup} data={available_stores} closePopup={closePopup} />
            <Text style={text_styles.smallTitle}>Store</Text>
            <Pressable style={item_style.concat({marginBottom: 15})} onPress={() => setPopup(true)}>
                {stores[store] ? (
                    <Text style={search_text}>{stores[store].name}</Text>
                ) : (
                    <Text style={search_text}>Select a store</Text>
                )}
            </Pressable>

            <Text style={text_styles.smallTitle}>Update</Text>
            <View style={item_style.concat({marginBottom: 15})}>
                <TextInput
                    style={search_text}
                    value={review}
                    onChangeText={setReview}
                    multiline={true}
                    textAlignVertical={"top"}
                    numberOfLines={3}
                    maxLength={64}
                />
            </View>

            <Text style={[add_button, post_style.addButton]} onPress={()=>navigation.navigate("Post Page")}>
                +
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default PostPage;


const post_style = StyleSheet.create({
    searchText: {
        width: '100%',

        paddingTop: 0,
        paddingBottom: 0,
    },
    addButton: {
        margin: 6,
        marginTop: 20,
        alignSelf: 'flex-end',
    }
});

const search_text = [text_styles.itemText, post_style.searchText]