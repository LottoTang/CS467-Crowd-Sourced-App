import React from "react";
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useState } from "react";
import { recommendedStoresForTotalShoppingList } from "../../../redux/funtionality/helperFunctions";


const TestStoreRec = () =>{

    const allItems = useSelector(state => state.allItems);
    const shoppingList = useSelector(state => state.shoppingList);
    const [ranking, setRanking] = useState("price");

    const recommendedStores = recommendedStoresForTotalShoppingList(shoppingList, allItems, ranking);


    return (
        <View>
            <Text>Ranking Type</Text>
            <Picker 
                selectedValue = {ranking}
                onValueChange = {(itemValue, itemIndex) => setRanking(itemValue)}>
                <Picker.Item label="Price" value="price"/>
                <Picker.Item label="Items Found" value="items"/>
            </Picker>
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