// react imports
import React from 'react';
import {
  SafeAreaView,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// function imports
import { getShoppingListItemsInStore, getProductInShoppingListDetails, removeSelectedItem, prepareShoppingList } from "../../redux/funtionality/helperFunctions";
import { viewSelectedItem, setUser, setShoppingListContent } from '../../redux/actions/actions.js';
import { removeItemFromArray } from '../ui_helpers.js';

// data imports
import { updateShoppingList } from '../../redux/funtionality/postPatchFunctions.js';
import { getAllItemsWithTag } from '../../redux/funtionality/connectionMongo.js';

// component imports
import Loading from '../components/LoadingPage.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ItemComponent = ({item, data}) => {
// item component that contains name of one item and a checkbox
    const [selected, handleSelect] = data

    let icon = "checkbox-blank-outline";
    if (selected) icon = "checkbox-marked";
    let size = 26
    if (selected == null) size = 0

    return (
        <Pressable style={item_style} onPress={() => handleSelect(item, !selected)}>
            <Text style={text_styles.itemText}>
                {item}
            </Text>
            <Icon
                name={icon}
                size={size}
                color={styles.secondaryItemBackground.color}
                style={{alignSelf: 'center'}}
            />
        </Pressable>
    );
};


function ItemsAtStore({route}) {
// the View Items at Specified Store screen itself with its components
    const store = route.params.store
    const user = useSelector((state)=> state.user);
    const [shopping_list, setShoppingList] = useState(useSelector((state)=> state.user.shopping_list_item))
    const shopping_list_content = useSelector(state => state.shopping_list_content);

    const [loading, setLoading] = useState(true);

    // collect dictionary of items available/missing
    const [items_found, setFound] = useState([])
    const [items_missing, setMissing] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const breakdown = await getShoppingListItemsInStore(shopping_list, store._id);
            setFound(breakdown.items_available)
            setMissing(breakdown.items_missing)
            setUnselectedItems(breakdown.items_available)

            setLoading(false);
        }
        fetchData()
    }, [])

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleViewMissing = (item)=>{
        dispatch(viewSelectedItem(item));
        navigation.navigate('View Item', {deletable: true, product: item});
    };


    const [unselected_products, setUnselectedItems] = useState([])
    const [selected_products, setSelectedItems] = useState([])

    const handleSelect = (item, isSelected) => {
        if (isSelected) {
            setUnselectedItems(removeItemFromArray(item, unselected_products))

            const array = selected_products.slice()
            array.push(item)
            setSelectedItems(array)
        } else {
            setSelectedItems(removeItemFromArray(item, selected_products))

            const array = unselected_products.slice()
            array.push(item)
            setUnselectedItems(array)
        }
    }

    const clearSelected = async () => {
        const allItems = await getAllItemsWithTag();
        console.log(allItems)

        let updatedList = prepareShoppingList(shopping_list, allItems);
        console.log(updatedList)
        for (const product of selected_products){
            updatedList = removeSelectedItem(updatedList, product);
        }
        console.log(updatedList)
        const res = await updateShoppingList(user._id, updatedList)
        dispatch(setUser(res));

        setSelectedItems([])
    };


    const list_data = [
        {
            title: `Items Missing at ${store.name}`,
            data: items_missing,
            selected: null,
            func: handleViewMissing
        },
        {
            title: "Shopping List",
            data: unselected_products,
            selected: false,
            func: handleSelect
        },
        {
            title: "Checked off",
            data: selected_products,
            selected: true,
            func: handleSelect
        }
    ]

    // Show loading screen while waiting for data
    if (loading) {
        return <Loading />
    }

    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container} >
            <SectionList
                sections={list_data}
                keyExtractor={(item, index)=> index.toString()}
                renderItem = { ({item, section}) =>
                    <ItemComponent item={item} data={[section.selected, section.func]} />
                }
                renderSectionHeader={ ({section: {title, data}}) => (
                    <View>
                        { data.length > 0 ? (
                        <Text style={text_styles.smallTitle}>{title}</Text>
                        ) : null}
                    </View>
                )}
                ListFooterComponent={
                    <View>
                        { selected_products.length > 0 ? (
                            <Pressable onPress={()=> clearSelected()} >
                                <Text style={addButton}>Clear</Text>
                            </Pressable>
                        ) : null}
                    </View>
                }
            />
        </View>
    </SafeAreaView>
    );
};

export default ItemsAtStore;


const store_items_style = StyleSheet.create({
   addButton: {
       fontSize: 18,

       margin: 6,

       alignSelf: 'flex-end',

       lineHeight: 20,
       paddingTop: 9,
       height: 29,
   },
});



const addButton = add_button.concat(store_items_style.addButton);