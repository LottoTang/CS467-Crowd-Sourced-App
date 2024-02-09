import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { stores, products, items, promotions} from "../../../testData/testingData2";
import { liveFeed } from "../../../testData/liveFeedData";
import { useNavigation } from "@react-navigation/native";
import { returnLiveFeeds } from "../../../redux/funtionality/helperFunctions";

const TestLiveFeeds = ()=>{

    const feedData = returnLiveFeeds(liveFeed, stores, items, products);

    return (
        <View> 
            <Text style={styles.profile}>John Doe</Text>
            <Text style={styles.segment}>Filter</Text>
            <FlatList style={styles.feed}
                data={feedData}
                 
                renderItem={({item})=>
                    <View style={styles.feedSection}>
                        <Text style={styles.feedReview}>{item.review}</Text>
                        <Text style={styles.feedStore}>{item.target}</Text>
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