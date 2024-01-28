import React from "react";
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { recommendedStoresForTotalShoppingList } from "../../../redux/funtionality/helperFunctions";


const TestStoreRec = () =>{

    const allItems = useSelector(state => state.allItems);
    const shoppingList = useSelector(state => state.shoppingList);

    const recommendedStores = recommendedStoresForTotalShoppingList(shoppingList, allItems);


    return (
        <View>
            <FlatList
                data={recommendedStores}
                renderItem={({item})=>(
                    <View>
                        <Text style={styles.storeRec}>{item.storeName}. Items Found: {item.numItems}. Total Cost: ${item.totalCost}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    storeRec:{
        backgroundColor: "pink",
        margin: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    }
})


export {TestStoreRec};