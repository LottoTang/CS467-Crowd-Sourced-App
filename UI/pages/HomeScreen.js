import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable
} from 'react-native';
import styles, {home_style} from '../style.js'
import NavigationBar from '../components/NavigationBar.js'
import { useState } from 'react';

// REPLACE this with data pulled from the database
const list_data = ["tomato sauce", "potatoes", "cherries", "chicken", "bread crumbs", "tuna", "bell peppers", "coffee", "peanuts"]
const short_list = ["tomato sauce", "potatoes", "cherries", "chicken"]

const testing_list = [{title: "tomato sauce"}, {title: "potatoes"}, {title: "cherries"}];


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

    const buttonFunction = ({item})=> {
        <Button style={home_style.listItem} title={item.title} onPress={()=>alert(item.title)}/>
    };

    return(
        <FlatList style={{marginTop: 10}}
            data={testing_list}
            renderItem = {
                ({item}) =>
                <Pressable onPress={()=>alert(item.title)}>
                    <ListElement item={item.title}/>
                </Pressable>
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