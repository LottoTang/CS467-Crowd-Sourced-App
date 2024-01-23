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
} from 'react-native';

// REPLACE this with data pulled from the database
const list_data = ["tomato sauce", "potatoes", "cherries", "chicken", "bread crumbs"]


type ListProps = {
    item: string;
};

const ListElement = (props: ListProps) => {
// text component for one element in the shopping list
    return (
        <Text>
            {props.item}
        </Text>
    )
}

const ShoppingList = () => {
// list component for the whole shopping list
    return(
        <FlatList
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
    <SafeAreaView>
        <ShoppingList />
    </SafeAreaView>
  );
};

export default HomeScreen;