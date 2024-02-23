// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// data imports
import axios from 'axios';
import { stores } from "../../testData/testingData2";

// component imports
import Dropdown from '../components/Dropdown.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';

function AddTagsPage({route}) {
// the Add tags page screen itself with its component

    const barcode = route.params.barcode;
    let item = {name: '', store: '', brand: '', price: 0, product_tags: [], promotion: ''}

    // TODO: replace with item retrieved from database based on barcode
    const all_items = {barcode: item}
    if (barcode in all_items) item = all_items[barcode]

    const [store, setStore] = useState(item.store);
    const [name, setName] = useState(item.name);
    const [brand, setBrand] = useState(item.brand);
    const [price, setPrice] = useState(item.price);
    const [tags, setTags] = useState(item.product_tags);
    const [sale, setSale] = useState(item.promotion);

    const date = new Date()
    const user = useSelector(state => state.user);

    const navigation = useNavigation();

    const handleSubmit = () => {
        // Handle form submission here, you can send the data to a backend or perform any other action.
        setPrice(price.toFixed(2))

        // TODO --> Add request to database
        navigation.navigate("Shopping List");
    };

    const available_stores = []
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) available_stores.push({label: store.name, value: store.name})
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <ScrollView>
                <Text style={label_text}>Store</Text>
                <Dropdown value={store} setValue={setStore} options={available_stores} type={"store"}/>

                <Text style={label_text}>Name</Text>
                <View style={item_style.concat({marginBottom: 15})}>
                    <TextInput
                        style={text_styles.inputText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <Text style={label_text}>Brand</Text>
                <Dropdown value={brand} setValue={setBrand} options={[]} type={"brand"}/>

                <Text style={label_text}>Price</Text>
                <View style={item_style.concat({marginBottom: 15}, styles.row)}>
                    <View style={{alignSelf: "center"}} >
                        <Text style={text_styles.inputText}>$</Text>
                    </View>

                    <View style={{width: "97%"}} >
                        <TextInput
                            style={text_styles.inputText}
                            value={price.toString()}
                            onChangeText={setPrice}
                            keyboardType={"numeric"}
                        />
                    </View>
                </View>

                <Text style={label_text}>Sale</Text>
                <Dropdown value={sale} setValue={setSale} options={[]} type={"sale"} placeholder={"None"}/>

                <Text style={label_text}>Tags</Text>
                <Dropdown value={tags} setValue={setTags} options={[]} type={"product tags"}/>

                <Text style={button} onPress={handleSubmit}>
                    Submit
                </Text>
            </ScrollView>
        </View>
    </SafeAreaView>
    );
};

export default AddTagsPage;


const tags_style = StyleSheet.create({
    button: {
       width: '60%',
       minHeight: '7.75%',

       borderWidth: 1,
       borderRadius: 20,

       padding: 6,
       margin: 10,

       alignSelf: 'center',
    },
    text: {
        paddingLeft: 8,
        paddingBottom: 0
    }
});

const button = [tags_style.button, text_styles.button]
const label_text = [text_styles.itemText, tags_style.text]