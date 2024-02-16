import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { stores, products, items, promotions} from "../../../testData/testingData2";
import { liveFeed } from "../../../testData/liveFeedData";
import { returnLiveFeeds, filterLiveFeeds } from "../../../redux/funtionality/helperFunctions";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const TestLiveFeeds = ()=>{

    const [filter, setFilter] = useState({metric: "all", store: "all", user_id: "all", brand: "all"});
    const [labels, setLabels] = useState({store: "All Stores", user: "All Users", brands:"All Brands"});

    const feedData = returnLiveFeeds(liveFeed, stores, items, products);
    const [updatedData, setUpdatedData] = useState(feedData);

    const handleFilter = (data) =>{
        setFilter(prevFilter => ({...prevFilter, 
            metric: data.metric, 
            store: data.store, 
            user_id: data.user_id, 
            brand: data.brand}));
        setLabels(data.label);

        const newData = filterLiveFeeds(feedData, data);
        setUpdatedData(newData);
    }

    const navigation = useNavigation();

    const makeAPost = () =>{
        navigation.navigate("MakePost");
    }

    return (
        <View> 
            <Text style={styles.profile}>John Doe</Text>
            <Pressable onPress={()=> makeAPost()}>
                <Text style={styles.makePost}>Post a Feed</Text>
            </Pressable>
            <View style={styles.filter}>
                <Picker style={styles.filter}
                    selectedValue = {labels.store}
                    onValueChange = {(item_value, item_index) => handleFilter({...filter, metric: item_value, store:item_value, label: {...labels, store: item_value}})}>
                    <Picker.Item label="All Stores" value="all"/>
                    <Picker.Item label="Shawn's" value="Shawn's"/>
                    <Picker.Item label="Walmart" value="Walmart"/>
                    <Picker.Item label="Shoprite" value="Shoprite"/>
                </Picker>
                <Picker style={styles.filter}
                    selectedValue = {labels.user}
                    onValueChange = {(item_value, item_index) => handleFilter({...filter, metric: item_value, user_id: item_value, label: {...labels, user: item_value}})}>
                    <Picker.Item label="All Users" value="all"/>
                    <Picker.Item label="user_test01" value="user_test01"/>
                    <Picker.Item label="user_test02" value="user_test02"/>
                    <Picker.Item label="user_test03" value="user_test03"/>
                    <Picker.Item label="user_test04" value="user_test04"/>
                </Picker>
                <Picker style={styles.filter}
                    selectedValue = {labels.brands}
                    onValueChange = {(item_value, item_index) => handleFilter({...filter, metric: item_value, brand: item_value, label: {...labels, brands: item_value}})}>
                    <Picker.Item label="All Brands" value="all"/>
                    <Picker.Item label="Barilla" value="Barilla"/>
                    <Picker.Item label="Bowl and Basket" value="Bowl and Basket"/>
                    <Picker.Item label="Brand 3" value="Brand 3"/>
                    <Picker.Item label="Brand 4" value="Brand 4"/>
                </Picker>
            </View>
            <FlatList style={styles.feed}
                data={updatedData}
                renderItem={({item})=>
                    <View style={styles.feedSection}>
                        <Text style={styles.feedReview}>{item.review}</Text>
                        <Text style={styles.feedStore}>{item.store}: {item.item}</Text>
                        <Text style={styles.feedDetails}>{item.user} - {item.date}</Text>
                    </View>
            }/>       
        </View>
    );
};

const styles = StyleSheet.create({
    profile: {
        fontSize: 20,
        fontWeight: "bold", 
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        color: "black"
    },
    segment:{
        fontSize: 20,
        textAlign: "right",
        marginBottom: 15,
        marginRight: 15,
        color: "black"
    },
    filter: {
        alignContent: "center"
    },
    feedReview: {
        color: "black",
        fontSize: 25, 
    },
    feedStore: {
        color: "red",
        fontSize: 20,
        fontWeight: "bold"
    },
    feedSection: {
        marginBottom: 20,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2
    },
    feed:{
        marginBottom: 80
    },
    feedDetails: {
        color: "black"
    }, 
    makePost: {
        color: "white",
        backgroundColor: "red",
        fontSize: 20,
        marginLeft: 10,
        marginRight: 100,
        textAlign: "center"
    }
});

export { TestLiveFeeds };