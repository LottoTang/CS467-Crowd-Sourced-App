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
import { addItemInShoppingList } from '../../redux/actions/actions.js';

// data imports
import axios from 'axios';

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

    // TODO: const brands = getBrandsList(product), where func retrieves from database
    //const all_products = useSelector(state => state.all_products);
    //const brands = getBrandsList(product, all_products);

    // Collect all brands from database
    useEffect( () => {
        const fillBrands = async ()=>{
            try{
                const response = await axios.get(`http://10.0.2.2:3000/items/`, {
                    params: {
                        tag: `${product}`,
                    }
                }).then(result => {
                    
                    const dataValues = result.data;
                    const brandsList =[];
                    const objIds = {};

                    for (let br in dataValues){
                        // Make sure a brand is captured only once
                        if (!brandsList.includes(dataValues[br].brand)){
                            brandsList.push(dataValues[br].brand);
                        }

                        // Capture item IDs for adding to shopping list
                        if (!(dataValues[br].brand in objIds)){
                            
                            objIds[dataValues[br].brand] = [dataValues[br]._id];
                        } else {
                            
                            objIds[dataValues[br].brand].push(dataValues[br]._id);
                        }

                    }
                    setItemIDs(objIds);
                    setAllBrands(brandsList);
                }).catch(error => console.log(error));
            } catch(error) {
                console.error(error);
            }
        } 

        fillBrands();
    }, []);
 
    brands = allBrands;

    // Get user ID
    const userId = useSelector(state => state.user._id);

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
                    idsShoppingList.push(item);
                }
            }
        } else {
            for (let key in itemIDs){
                if (selected_brands.includes(key)){
                    for (let item in itemIDs[key]){
                        idsShoppingList.push(item);
                    }
                }
            }
        }

        // Method for adding an item in the database
        const add_item = async ()=>{
            try{
                const response = await axios.patch(`http://10.0.2.2:3000/users/shopping-list-item/${userId}`,
                { [product]: `${idsShoppingList}`} 
                );
            } catch(error){
                console.log(error);
            }
        };
        // TODO: replace dispatch function with function that accesses database
        dispatch(addItemInShoppingList(product, selected));
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