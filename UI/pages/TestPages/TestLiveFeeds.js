import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { stores, products, items, promotions} from "../../../testData/testingData2";
import { liveFeed } from "../../../testData/liveFeedData";
import { useNavigation } from "@react-navigation/native";
import { returnLiveFeeds, filterLiveFeeds } from "../../../redux/funtionality/helperFunctions";
import { useState } from "react";

const TestLiveFeeds = ()=>{

    const feedData = returnLiveFeeds(liveFeed, stores, items, products);
    const [filter, setFilter] = useState({metric: null, value: ""});
    const filteredData = filterLiveFeeds(feedData, filter[1], filter[0])

    return (
        <View> 
            <Text style={styles.profile}>John Doe</Text>
            <Text style={styles.segment}>Filter</Text>
            <Picker style={styles.filter}
                selectedValue = {filter}
                onValueChange = {(item_value, item_index) => setFilter({metric: "store", value: item_value})}>
                <Picker.Item label="All Stores" value={null}/>
                <Picker.Item label="Shawn's" value="Shawn's"/>
                <Picker.Item label="Walmart" value="Walmart"/>
                <Picker.Item label="Shoprite" value="Shoprite"/>
            </Picker>
            <FlatList style={styles.feed}
                data={filteredData}
                 
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
        textAlign: "right",
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
    }
});

export { TestLiveFeeds };