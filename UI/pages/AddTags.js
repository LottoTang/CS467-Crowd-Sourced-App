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
        //setPrice(price.toFixed(2))

        // TODO --> Add request to database
        navigation.navigate("Shopping List");
    };

    const available_stores = []
    for (const store_id in stores) {
        const store = stores[store_id]
        if (store.city == user.city && store.state == user.state) available_stores.push(store.name)
    }

    const products = []
    const all_products = useSelector(state => state.all_products)
    for (product_id in all_products) {
        const product = all_products[product_id]
        products.push(product.name)
    }

    const [possible_brands, setBrands] = useState(["Please select one or more product tags first"])
    useEffect(() => {
        let brands = new Set()
        for (const tag of tags) {
            for (const product_id in all_products) {
                const product = all_products[product_id]
                if (product.name == tag) product.brands.forEach(brand => brands.add(brand))
            }
        }
        const new_brands = []
        brands.forEach(brand => new_brands.push(brand))
        if (new_brands.length != 0) setBrands(new_brands)
    }, [tags])


    const all_promotions = useSelector(state => state.all_promotions)
    const promotions = ["None"]
    for (const promotion_id in all_promotions) {
        const promotion = all_promotions[promotion_id]
        promotions.push(promotion.promotion_type)
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <ScrollView>
                <Text style={label_text}>Store</Text>
                <Dropdown value={store} setValue={setStore} options={available_stores} type={"store"}/>

                <Text style={label_text}>Item Name</Text>
                <View style={item_style.concat({marginBottom: 15})}>
                    <TextInput
                        style={text_styles.inputText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <Text style={label_text}>Product Tags</Text>
                <Dropdown value={tags} setValue={setTags} options={products} type={"product"}/>

                <Text style={label_text}>Brand</Text>
                <Dropdown value={brand} setValue={setBrand} options={possible_brands} type={"brand"}/>

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
                <Dropdown value={sale} setValue={setSale} options={promotions} type={"sale"} placeholder={"None"}/>

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