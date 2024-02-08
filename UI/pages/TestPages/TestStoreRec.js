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

    const shopping_list = useSelector(state => state.shopping_list);
    const [ranking, setRanking] = useState("price");

    const navigation = useNavigation();

    const stores_breakdown = getGoShoppingList(shopping_list, items, stores);
    const ranked_data = getStoresSorting(stores_breakdown, ranking);
    //const data = Object.values(stores_breakdown);

    const handleStore = (item)=>{
        navigation.navigate("TestMissingItems", {shopping_list: item});
    }


    return (
        <View>
            <Text>Ranking Type</Text>
            <Picker 
                selectedValue = {ranking}
                onValueChange = {(item_value, item_index) => setRanking(item_value)}>
                <Picker.Item label="Price" value="price"/>
                <Picker.Item label="Items Found" value="items"/>
                <Picker.Item label="Store" value="store_name"/>
            </Picker>
            <FlatList
                data={ranked_data}
                renderItem={({item})=>(
                    <View>
                        <Pressable onPress={()=>handleStore(item)}>
                            <Text style={styles.storeRec}>{item.name}. Items Found: {item.num_items}. Total Cost: ${item.total_cost}</Text>
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