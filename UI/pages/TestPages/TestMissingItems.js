import React from "react";
import {
    SafeAreaView,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { useSelector, useDispatch } from "react-redux";
  import { getShoppingListItemsInStore, getProductInShoppingListDetails } from "../../../redux/funtionality/helperFunctions";
  import { viewSelectedItem } from "../../../redux/actions/actions";
  import { useNavigation } from "@react-navigation/native";


  const TestMissingItems = ({route})=>{

    const shopping_list = useSelector(state => state.shopping_list);
    const all_items = useSelector(state => state.all_items);
    let store_name = route.params.shopping_list.store_name;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // collect dictionary of items available/missing
    const breakdown_items = getShoppingListItemsInStore(shopping_list, store_name, all_items);
    const items_found = breakdown_items.items_available;
    const items_missing = breakdown_items.items_missing;

    const handleSelectedItem = (item)=> {
        const details = getProductInShoppingListDetails(item, shopping_list);
        dispatch(viewSelectedItem(details.product));
        //console.log(details.product);
        navigation.navigate("View Item");
    }

    return (
        <View>
            <Text style={styles.segment}>Items missing from the list:</Text>
            <FlatList
                data={items_missing}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => ( 
                    <Pressable onPress={()=>handleSelectedItem(item)}>
                        <View style={styles.items}>
                            <Text style={styles.missing}>{item}</Text>
                        </View>
                    </Pressable>
                )}
            />
            <Text style={styles.segment}>Shopping List:</Text>
            <FlatList
                data={items_found}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => ( 
                    <Pressable onPress={()=>handleSelectedItem(item)}>
                        <View style={styles.items}>
                            <Text style={styles.found}>{item}</Text>
                        </View>
                    </Pressable>
                )}
            />
            <Text style={styles.segment}>Checked off:</Text>
        </View>
    );
  }

const styles = StyleSheet.create({
    segment: {
        
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    items: {
        margin: 2,
        paddingLeft: 5,
        marginRight: 100
    },
    missing: {
        color: "white",
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: "red"
    },
    found: {
        color: "white",
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: "darkgreen"
    }
});

export {TestMissingItems};