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
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// data imports
import axios from 'axios';
import { stores } from "../../testData/testingData2";

// component imports
import { StoresDropdown, TagsDropdown, BrandsDropdown, PromotionsDropdown, SaleDatePicker } from '../components/AddTagsComponents.js'

// style imports
import styles, {item_style, text_styles} from '../style.js';


function AddTagsPage({route}) {
// the Add tags page screen itself with its component
    const barcode = route.params.barcode;
    const user = useSelector(state => state.user);

    // create empty item and empty form data
    const [item, setItem] = useState({name: '', store_id: '', brand: '', price: 0, product_tags: [], promotion_id: ''})

    const [store, setStore] = useState(item.store_id);
    const [name, setName] = useState(item.name);
    const [tags, setTags] = useState(item.product_tags);
    const [brand, setBrand] = useState(item.brand);
    const [price, setPrice] = useState(item.price);
    const [sale, setSale] = useState(item.promotion_id);
    const [endSale, setEnd] = useState(new Date())
    const [pickDate, setPicker] = useState(false)

    // retrieve all of the stores in the user's area, put them in a dict format {name: id}
    const stores_dict = {}
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) stores_dict[store.name] = store_id
    }

    // retrieve all of the promotions, put them in a dict format {name: id}
    const sales_dict = {None: null}
    const all_promotions = useSelector(state => state.all_promotions)
    for (const promotion_id in all_promotions) {
        const promotion = all_promotions[promotion_id]
        sales_dict[promotion.promotion_type] = promotion_id
    }


    // once the store has been specified, check if the item already exists there
    useEffect(()=> {
        // TODO: replace with item retrieved from database based on barcode
        const all_items = {barcode: item}
        if (barcode in all_items) {
            found = all_items[barcode]
            setItem(all_items[barcode])

            // auto-populate the info if an item was found
            setName(found.name)
            setTags(found.product_tags)
            setBrand(found.brand)
            setPrice(found.price)
            setSale(all_promotions[found.promotion_id].promotion_type)
            setEnd(all_promotions[found.promotion_id].end_time)
        }
    }, [store])


    const navigation = useNavigation();

    const handleSubmit = () => {
        // verify that all data was input
        if (!store || !name || tags.length == 0 || !brand || price == 0) {
            Alert.alert("Invalid Entry", "Please add all necessary information", [{text: 'Ok'}] );
        } else {
            // create a new item with the provided data
            const new_item = {name: name, store_id: stores_dict[store], brand: brand,
                            price: parseFloat(price).toFixed(2), product_tags: tags,
                            promotion_id: sales_dict[sale], barcode_id: barcode,
                            date: new Date(), user_id: user._id}

            // verify that this identical item doesn't already exist in database
            let identical = true
            for (key in item)
                if (key == "date" || key == "user_id") continue
                if (new_item[key] != item[key]) identical = false

            if (identical) Alert.alert("Duplicate Entry", "This item is already up to date", [{text: 'Ok'}] )
            else {
                // add the item to the database
                // TODO --> Add request to database
            }

            // reset scan tab and go back to shopping list
            navigation.navigate("Scan");
            navigation.navigate("Shopping List");
        }
    };


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <ScrollView>
                <StoresDropdown store={store} setStore={setStore} stores={Object.keys(stores_dict)} />

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

                <PromotionsDropdown sale={sale} setSale={setSale} promotions={Object.keys(sales_dict)} />

                {sale && sale != "None" ? (
                    <SaleDatePicker endSale={endSale} setEnd={setEnd} pickDate={pickDate} setPicker={setPicker} />
                ) : null}

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