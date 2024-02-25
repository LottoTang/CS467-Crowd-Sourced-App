// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// function imports
import { getSelectedBrandsForProduct, getItemsList, getItemSorting, convertItemsOutput } from '../../redux/funtionality/helperFunctions';

// data imports
import { fetchItems, fetchStores } from '../../redux/funtionality/connectionMongo.js';

// component imports
import StoresList from '../components/StoresList.js'
import PopupModal from '../components/PopupModal.js'

// style imports
import styles, {text_styles, add_button, popup_style} from '../style.js';
import Icon from 'react-native-vector-icons/Feather';


function ViewItem() {
// the View Item screen itself with its components
    const product = useSelector(state=> state.selected_item);
    const [allItem, setAllItem] = useState([]);
    const [allStores, setAllStores] = useState({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    //const dispatch = useDispatch();
    const [ranking, setRanking] = useState("price");
    //const all_items = useSelector(state => state.all_items);
    const shopping_list = useSelector((state)=> state.user.shopping_list_item);
    const [popup, setPopup] = useState(false)

    let item_ids = shopping_list[product]
    if (!item_ids) item_ids = []
    
    // Retrieve all items and all stores from database 
    useEffect(()=>{
        const fetchData = async () => {
            const items = await fetchItems(product)
            const stores = await fetchStores()

            setAllItem(items)
            setAllStores(stores)

            setLoading(false)
        }
        fetchData()
    }, []);


    if (loading){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }


    const items = convertItemsOutput(allItem, allStores);
    //const items = getItemsList(item_ids, all_items);
    const selected_brands = getSelectedBrandsForProduct(items);

    //const ranked_data = getItemSorting(items, ranking, stores);
    const ranked_data = getItemSorting(items, ranking, allStores);

    if (!product) {
        return <Text>No product selected</Text>;
    }

    const handleEditItem = (item) => {
        // Go to select brand page
        navigation.navigate('Select Brand', {product: item, preselected: selected_brands});
    };

    const popup_vals = ["Price", "Store", "Brand"]

    const closePopup = (selection=null) => {
        if (selection != null) setRanking(selection)
        setPopup(false)
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <PopupModal popup={popup} data={popup_vals} closePopup={closePopup} />

            <View style={{marginRight: 10}}>
                <View style={styles.row}>
                    <Text style={text_styles.smallTitle}>Brands Selected:</Text>
                    <Pressable style={{alignSelf: 'center'}} onPress={() => handleEditItem(product)}>
                        <Icon
                            name={"edit"}
                            size={26}
                            color={styles.secondaryItemBackground.color}
                        />
                    </Pressable>
                </View>
                <FlatList
                    data={selected_brands}
                    horizontal={true}
                    style={styles.horizontalList}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem = { ({item}) =>
                        <Text style={text_styles.itemText}>{item}    </Text>
                    }
                />
                <View style={[styles.row, {marginTop: 12}]}>
                    <Text style={text_styles.smallTitle}>Store(s):</Text>
                    <Pressable style={{alignSelf: 'flex-end', marginBottom: 4}} onPress={() => setPopup(true)}>
                        <Text style={[add_button, popup_style.buttonText]}>Sort</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{height: '76%'}}>
                <StoresList items={ranked_data}/>
            </View>
        </View>
    </SafeAreaView>
    );
};

export default ViewItem;


const view_style = StyleSheet.create({
    title: {
        fontSize: 30,
        color: styles.textColor.color,
        fontFamily: styles.fontBold.fontFamily,

        marginLeft: 6,
    },
    testDelete: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 250
    }
});