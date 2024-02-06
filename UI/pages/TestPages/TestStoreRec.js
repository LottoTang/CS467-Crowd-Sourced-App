import React from "react";
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useState } from "react";
import { recommendedStoresForTotalShoppingList } from "../../../redux/funtionality/helperFunctions";
import { useNavigation } from "@react-navigation/native";
import { items, stores, products, promotions } from "../../../testData/testingData2";
import { getGoShoppingList, getStoresSorting } from "../../../redux/funtionality/helperFunctions";


const TestStoreRec = () =>{

    const shoppingList = useSelector(state => state.shoppingList);
    const [ranking, setRanking] = useState("price");

    const navigation = useNavigation();

    const storesBreakdown = getGoShoppingList(shoppingList, items, stores);
    const rankedData = getStoresSorting(storesBreakdown, ranking);
    //const data = Object.values(storesBreakdown);

    const handleStore = (item)=>{
        navigation.navigate("TestMissingItems", {shoppingList: item});
    }


    return (
        <View>
            <Text>Ranking Type</Text>
            <Picker 
                selectedValue = {ranking}
                onValueChange = {(itemValue, itemIndex) => setRanking(itemValue)}>
                <Picker.Item label="Price" value="price"/>
                <Picker.Item label="Items Found" value="items"/>
                <Picker.Item label="Store" value="store_name"/>
            </Picker>
            <FlatList
                data={rankedData}
                renderItem={({item})=>(
                    <View>
                        <Pressable onPress={()=>handleStore(item)}>
                            <Text style={styles.storeRec}>{item.name}. Items Found: {item.numItems}. Total Cost: ${item.totalCost}</Text>
                        </Pressable>
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