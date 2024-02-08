import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { stores, products, items, promotions} from "../../../testData/testingData2";
import { liveFeed } from "../../../testData/liveFeedData";
import { useNavigation } from "@react-navigation/native";
import { returnLiveFeeds } from "../../../redux/funtionality/helperFunctions";

const TestLiveFeeds = ()=>{

    const feedData = returnLiveFeeds(liveFeed, stores, products);
    console.log(promotions);

    return (
        <View>
            <Text style={styles.profile}>John Doe</Text>
            <Text style={styles.segment}>Filter</Text>
            <FlatList style={styles.feed}
                data={feedData}
                renderItem={({item})=>
                    <Text>{item}</Text>
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
    feed: {
        color: "black",
        fontSize: 15, 
    }
});

export { TestLiveFeeds };