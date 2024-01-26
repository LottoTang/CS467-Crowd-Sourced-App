import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';
import styles, {item_style, text_styles} from '../style.js';


const ShoppingList = () => {
// list component for the whole shopping list
    // TODO: replace this with data pulled from the database
    const list_data = ["tomato sauce", "potatoes", "cherries", "chicken"]
    const long_list = ["tomato sauce", "potatoes", "cherries", "chicken", "bread crumbs", "tuna", "bell peppers", "coffee", "peanuts"]
    return(
        <FlatList
            data={list_data}
            renderItem = { ({item}) =>
                <Text style={item_style.style}>
                    {item}
                </Text>
            }
        />
    )
}


function HomeScreen({navigation}) {
// the Home screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View  style={{maxHeight: '85%'}}>
                <ShoppingList />
                <Text
                        style={[home_style.addButton, text_styles.button]}
                        onPress={() =>
                            navigation.navigate('Add Items')
                        }>
                    +
                </Text>
            </View>

            <View style={styles.bottom}>
                <Text style={[home_style.shopButton, text_styles.button]}>
                    Go Shopping!
                </Text>
            </View>
        </View>

        <NavigationBar/>
    </SafeAreaView>
  );
};

export default HomeScreen;




const home_style = StyleSheet.create({
   addButton: {
       borderRadius: 15,

       paddingLeft: 26,
       paddingRight: 24,
       margin: 6,

       alignSelf: 'flex-end',
   },
   shopButton: {
       width: '80%',
       minHeight: '9.75%',

       borderWidth: 1,
       borderRadius: 20,

       padding: 12,
       margin: 6,

       alignSelf: 'center',
   }
});