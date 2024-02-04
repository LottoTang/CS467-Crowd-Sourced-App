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

    const shoppingList = useSelector(state => state.shoppingList);
    const allItems = useSelector(state => state.allItems);
    let storeName = route.params.shoppingList.storeName;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // collect dictionary of items available/missing
    const breakdownItems = getShoppingListItemsInStore(shoppingList, storeName, allItems);
    const itemsFound = breakdownItems.itemsAvailable;
    const itemsMissing = breakdownItems.itemsMissing;

    const handleSelectedItem = (item)=> {
        const details = getProductInShoppingListDetails(item, shoppingList);
        dispatch(viewSelectedItem(details.product));
        //console.log(details.product);
        navigation.navigate("View Item");
    }

    return (
        <View>
            <Text style={styles.segment}>Items missing from the list:</Text>
            <FlatList
                data={itemsMissing}  
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
                data={itemsFound}  
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