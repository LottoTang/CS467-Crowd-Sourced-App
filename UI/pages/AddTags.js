// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
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

// component imports
import { StoresDropdown, TagsDropdown, BrandsDropdown, PromotionsDropdown } from '../components/AddTagsComponents.js'

// style imports
import styles, {item_style, text_styles} from '../style.js';


function AddTagsPage({route}) {
// the Add tags page screen itself with its component

    const barcode = route.params.barcode;
    let item = {name: '', store: '', brand: '', price: 0, product_tags: [], promotion: ''}

    // TODO: replace with item retrieved from database based on barcode
    const all_items = {barcode: item}
    if (barcode in all_items) item = all_items[barcode]

    const [store, setStore] = useState(item.store);
    const [name, setName] = useState(item.name);
    const [tags, setTags] = useState(item.product_tags);
    const [brand, setBrand] = useState(item.brand);
    const [price, setPrice] = useState(item.price);
    const [sale, setSale] = useState(item.promotion);

    const date = new Date()
    const user = useSelector(state => state.user);

    const navigation = useNavigation();

    const handleSubmit = () => {
        if (!store || !name || tags.length == 0 || !brand || price == 0) console.log("item not selected")

        setPrice(parseFloat(price).toFixed(2))

        // TODO --> Add request to database
        navigation.navigate("Scan");
        navigation.navigate("Shopping List");
    };


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <ScrollView>
                <StoresDropdown store={store} setStore={setStore} user={user} />

                <Text style={label_text}>Item Name</Text>
                <View style={item_style.concat({marginBottom: 15})}>
                    <TextInput
                        style={text_styles.inputText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <TagsDropdown tags={tags} setTags={setTags} />
                <BrandsDropdown tags={tags} brand={brand} setBrand={setBrand} />

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

                <PromotionsDropdown sale={sale} setSale={setSale} />

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