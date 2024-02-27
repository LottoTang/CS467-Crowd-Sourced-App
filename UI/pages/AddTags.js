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
import { fetchStores, fetchProduct, fetchPromotions, getItemByBarcode } from '../../redux/funtionality/connectionMongo.js';
import { addProduct, updateBrands, createPromotion, addItem, updateItem } from '../../redux/funtionality/postPatchFunctions.js';

// component imports
import { StoresDropdown, TagsDropdown, BrandsDropdown, PromotionsDropdown, SaleDatePicker } from '../components/AddTagsComponents.js'
import Loading from '../components/LoadingPage.js'

// style imports
import styles, {item_style, text_styles} from '../style.js';


function AddTagsPage({route}) {
// the Add tags page screen itself with its component
    const navigation = useNavigation();

    const barcode = route.params.barcode;
    const user = useSelector(state => state.user);

    // create empty item and empty form data
    const [item, setItem] = useState({name: '', store_id: '', brand: '', price: 0, product_tags: [], promotion_id: ''})

    // form data
    const [store, setStore] = useState(item.store_id);
    const [name, setName] = useState(item.name);
    const [tags, setTags] = useState(item.product_tags);
    const [brand, setBrand] = useState(item.brand);
    const [price, setPrice] = useState(item.price);
    const [sale, setSale] = useState(item.promotion_id);

    // data loading from database
    const [loading, setLoading] = useState(true)
    const [stores_dict, setStores] = useState({})
    const [sales_dict, setSales] = useState({None: null})
    const [editable, setEditable] = useState(true)

    // new data to be posted on submit
    const [new_products, setNewProducts] = useState([])
    const [new_brand, setNewBrand] = useState("")
    const [new_sale, setNewSale] = useState("")

    const addNewProduct = (product) => {
        setNewProducts(new_products.concat([product]))
    }

    useEffect(() => {
        const fetchData = async () => {
            // retrieve all of the stores in the user's area, put them in a dict format {name: id}
            const stores_dict = {}
            const stores = await fetchStores()
            for (const store of stores) {
                stores_dict[store.name] = store._id
            }
            setStores(stores_dict)

            // retrieve all of the promotions, put them in a dict format {name: id}
            const sales_dict = {None: null}
            const all_promotions = await fetchPromotions()
            if (all_promotions){
                for (const promotion of all_promotions) {
                    sales_dict[promotion.promotion_type] = promotion._id
                }
                setSales(sales_dict)
            }

            setLoading(false)
        }
        fetchData()
    }, [])


    // once the store has been specified, check if the item already exists there
    useEffect(() => {
        const fetchData = async () => {
            const found = await getItemByBarcode(barcode, store)
            if (found) {
                setItem(found)

                // disable editing item name and brand
                setEditable(false)

                // auto-populate the info if an item was found
                setName(found.name)
                setTags(found.product_tags)
                setBrand(found.brand)
                setPrice(found.price)
                setSale(all_promotions[found.promotion_id].promotion_type)
            }
        }
        fetchData()
    }, [store])

    if (loading) {
        return <Loading />
    }

    const handleSubmit = async () => {
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
                // if a new brand is being added, it needs to be added to each product
                if (new_brand == brand) {
                    for (const product of tags) {
                        // if a new product is being added, the brand is added with no need to update
                        if (new_products.includes(product)) {
                            addProduct(product, [new_brand])
                        // if product already exists, update that product to include new brand
                        } else {
                            const product_obj = fetchProduct(product)
                            updateBrands(product_obj._id, product_obj.brands.concat(new_brand))
                        }
                    }
                // if no new brand, only need to iterate over new products, not all products
                } else {
                    for (const new_product of new_products) {
                        // verify that new product wasn't unchecked, in which case it isn't added
                        if (tags.includes(new_product)){
                            addProduct(product, [brand])
                        }
                    }
                }

                if (new_sale && new_sale == sale) {
                    new_item.promotion_id = await createPromotion(new_sale)
                }
                if (item._id) {
                    updateItem(item._id, new_item)
                }
                else {
                    addItem(new_item)
                }
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
                        editable={editable}
                    />
                </View>

                <TagsDropdown tags={tags} setTags={setTags} setNew={addNewProduct} new_products={new_products} />
                <BrandsDropdown tags={tags} brand={brand} setBrand={setBrand} setNew={setNewBrand} editable={editable} />

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

                <PromotionsDropdown sale={sale} setSale={setSale} promotions={Object.keys(sales_dict)} setNew={setNewSale} />

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