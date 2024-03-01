// react imports
import React, { useState } from 'react';
import {
  SafeAreaView,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getHeaderTitle} from '@react-navigation/elements';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// function imports
import { deleteItemInShoppingList } from '../../redux/actions/actions.js';
import { capitalizeTitle } from '../ui_helpers.js'
import { removeSelectedItem, prepareShoppingList } from '../../redux/funtionality/helperFunctions.js';
import { setUser } from '../../redux/actions/actions.js';
import { getAllItemsWithTag } from '../../redux/funtionality/connectionMongo.js';

// style imports
import styles, {item_style, text_styles} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const headerFunc = ({navigation, route, options, back}) => {
// the Header at the top of each screen, including back button, title, and username
    const user = useSelector(state => state.user);
    const [allItems, setAllItems] = useState([]);

    const title = getHeaderTitle(options, route.name);

    let header_height = 116
    if (title == "") header_height = 63

    let icon_size = 0
    if (route.params) {
        if (route.params.deletable) icon_size = 32
    }

    let show_user = true
    if (["Profile Page", "Sign Up"].includes(route.name)) show_user = false

    let header_padding = 10
    if (title == "Scan a Barcode") header_padding = 0


    const dispatch = useDispatch();

    const deleteAlert = (item) => {
        Alert.alert(`Delete ${capitalizeTitle(item)}`,
            `Are you sure you want to remove ${item} from your shopping list?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Canceled')
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        dispatch(deleteItemInShoppingList(route.params.product));
                        
                        // Get users shopping list 
                        const shoppingList = user.shopping_list_item;
                        const newList = removeSelectedItem(shoppingList, route.params.product);

                        // get all items to update shopping list with brands
                        const getData = async ()=>{
                            try{
                                const response = await axios.get(`http://10.0.2.2:3000/items/allitems`)
                                .then(result => setAllItems(result.data)).catch(error=>console.log(error));
                            }catch(error) {
                                console.log(error);
                            }
                        };
                        getData();
                        const updatedShoppingList = prepareShoppingList(newList, allItems);
                        //console.log(allItems)
                        //console.log(updatedShoppingList);
                        // Send update to shopping list 
                        
                        const updateRequest = async ()=>{
                            try{
                                const response = await axios.patch(`http://10.0.2.2:3000/users/shopping-list-item/${user._id}`,
                                updatedShoppingList
                                ).then(result => {
                                // if shopping_list updated, reset redux user
                                dispatch(setUser(result.data));
                                }).catch(error=> console.log(error));
                                
                            } catch(error){
                                console.log(error);
                            }
                        };
                        updateRequest();
                        
                        navigation.navigate("Home");
                    }
                }
            ]
        );
    }

    return(
        <SafeAreaView style={[header_style.header, {height: header_height, borderBottomWidth: header_padding}]}>
            <View style={top_row}>
                <Text onPress={navigation.goBack} style={header_style.text}>
                    Back
                </Text>

                { show_user ? (
                    <Pressable style={styles.row} onPress={()=> navigation.navigate("Profile")}>
                        <Text style={header_style.number}>{user.shopping_level}</Text>
                        <Text style={header_style.text}> {user.username}</Text>
                    </Pressable>
                ) : null}
            </View>
            <View style={styles.row}>
                <Text style={text_styles.largeTitle}>
                    {title}
                </Text>
                <Pressable style={header_style.trash} onPress={()=> deleteAlert(route.params.product)}>
                   <Icon
                       name={"trash-can-outline"}
                       size={icon_size}
                       color={styles.secondaryTextColor.color}
                   />
               </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default headerFunc;



const header_style = StyleSheet.create({
    header: {
        minWidth: '100%',

        borderColor: styles.backgroundColor.color,

        backgroundColor: styles.headerColor.color,
    },
    text: {
        color: styles.secondaryTextColor.color,
        fontFamily: styles.fontRegular.fontFamily,
        textAlign: 'center',

        padding: 4,
    },
    topButtons: {
        width: '93%',
        marginTop: 10,
    },
    number: {
        fontSize: 13,
        color: styles.secondaryTextColor.color,
        fontFamily: 'Ultra-Regular',
        textAlign: 'center',

        borderWidth: 2,
        borderRadius: 20,
        borderColor: styles.secondaryTextColor.color,

        paddingLeft: 7,
        paddingRight: 8,
        paddingTop: 6,
    },
    trash: {
        marginRight: 18,
        alignSelf: 'center'
    }
});

const top_row = [styles.wideRow, header_style.topButtons];
