import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from '../style.js';
import NavigationBar from '../components/NavigationBar.js';

// TODO: replace this with data pulled from the database
const list_data = ["tomato sauce", "potatoes", "cherries", "chicken"]
const long_list = ["tomato sauce", "potatoes", "cherries", "chicken", "bread crumbs", "tuna", "bell peppers", "coffee", "peanuts"]


type ListProps = {
    item: string;
};

const ListElement = (props: ListProps) => {
// text component for one element in the shopping list
    return (
        <Text style={home_style.listItem}>
            {props.item}
        </Text>
    )
}

const ShoppingList = () => {
// list component for the whole shopping list
    return(
        <FlatList style={{marginTop: 10}}
            data={list_data}
            renderItem = {
                ({item}) =>
                <ListElement item={item} />
            }
        />
    )
}


function HomeScreen() {
// the Home screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View  style={{maxHeight: '85%'}}>
                <ShoppingList />
                <Text style={home_style.addButton}>+</Text>
            </View>

            <View style={styles.bottom}>
                <Text style={home_style.shopButton}>Go Shopping!</Text>
            </View>
        </View>

        <NavigationBar />
    </SafeAreaView>
  );
};

export default HomeScreen;



const home_style = StyleSheet.create({
   listItem: {
        padding: 12,
        margin: 6,

        borderWidth: 1,
        borderRadius: 5,
        borderColor: styles.borderColor.color,

        fontFamily: styles.fontMedium.fontFamily,

        color: styles.textColor.color,
        backgroundColor: styles.itemBackground.color
   },
   addButton: {
        alignSelf: 'flex-end',
        paddingLeft: 26,
        paddingRight: 24,
        margin: 6,

        fontSize: 24,
        fontFamily: styles.fontBold.fontFamily,

        borderWidth: 1,
        borderRadius: 15,
        borderColor: styles.borderColor.color,

        color: styles.secondaryTextColor.color,
        backgroundColor: styles.secondaryItemBackground.color
   },
   shopButton: {
        alignSelf: 'center',
        padding: 12,
        margin: 6,

        textAlign: 'center',
        fontSize: 24,
        fontFamily: styles.fontBold.fontFamily,

        width: '80%',
        minHeight: '9.75%',

        borderWidth: 1,
        borderRadius: 20,
        borderColor: styles.borderColor.color,

        color: styles.secondaryTextColor.color,
        backgroundColor: styles.secondaryItemBackground.color
   }
});