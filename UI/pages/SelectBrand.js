// react imports
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


// function imports
import { getBrandsList } from '../../redux/funtionality/helperFunctions';
import { setUser } from '../../redux/actions/actions.js';

// data imports
import axios from 'axios';
import { fetchBrands, fetchItems } from '../../redux/funtionality/connectionMongo.js';

// component imports
import CheckList from '../components/CheckList.js'

// style imports
import styles, {text_styles, add_button} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function SelectBrand({route}) {
// the Select Brand screen itself with its components
    let {product, preselected} = route.params;
    if (preselected == undefined) preselected = []

    const [selected_brands, setSelectedItems] = useState(preselected)
    const [allBrands, setAllBrands] = useState([]);
    const [itemIDs, setItemIDs] = useState({});
    const [branding, setBranding] = useState([]);

    // Collect all brands from database
    useEffect( () => {
        const fillBrands = async ()=>{
            const brands = await fetchBrands(product)

            const items = await fetchItems(product)

            const objIds = {};
            for (const item of items){
                if (item.brand in objIds) objIds[item.brand].push(item._id)
                else objIds[item.brand] = [item._id]
            }

            setAllBrands(brands)
            setItemIDs(objIds)
        }
        fillBrands();
    }, []);
 
    brands = allBrands;

    // Get user ID
    const userId = useSelector(state => state.user._id);
    const shoppingList = useSelector(state => state.user.shopping_list_item)

    // Set up connection with store to dispatch signal
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const handlePress = ()=>{
        let selected = selected_brands
        if (selected_brands.includes("Any brand")) selected = brands


        
        const idsShoppingList = [];

        // Populate list of brands with item ids
        
        if (selected_brands.includes("Any brand")){
        
            for (let key in itemIDs){

                for (let item in itemIDs[key]){
                    idsShoppingList.push(itemIDs[key][item]);
                    setBranding([...branding, {_id: itemIDs[key][item]}]);
                }
            }
        } else {

            for (let key in itemIDs){

                if (selected_brands.includes(key)){
                    for (let item in itemIDs[key]){
                        idsShoppingList.push(itemIDs[key][item]);
                        setBranding([...branding, {_id: itemIDs[key][item]}]);
                    }
                }
            }
        }
       
        const newItems = idsShoppingList.map(itemId => ({_id: itemId}));
        
        // Method for adding an item in the database
        const add_item = async ()=>{

            // Update shopping list 
            const newShoppingList = {
                ...shoppingList,
                //[product] : newItems.concat(shoppingList[product] || []),
                [product] : {newItems},
            };
            const copyShoppingList = {...newShoppingList};

            // Send updated shopping list
            try{
                const response = await axios.patch(`http://10.0.2.2:3000/users/shopping-list-item/${userId}/`,
                    copyShoppingList,
            ).then(result => {
                 // if shopping_list updated, reset redux user
                 dispatch(setUser(result.data));
                 })
            .catch(error => console.error(error));
            } catch(error){
                console.error(error);
            }
        };
        add_item();
        navigation.navigate('Home');
    }
    
    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={text_styles.smallTitle}>Brand(s):</Text>
            <View  style={{maxHeight: '62%'}}>
                <CheckList
                    data={brands}
                    type="brand"
                    selected_items={selected_brands}
                    setSelectedItems={setSelectedItems}
                />
            </View>

            <View style={styles.bottom}>
                <Text style={addButton} onPress={() => handlePress()}>+</Text>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default SelectBrand;


const brand_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
    addButton: {
        margin: 6,
        marginTop: 12,

        alignSelf: 'flex-end',
    },
});

const addButton = add_button.concat(brand_style.addButton);