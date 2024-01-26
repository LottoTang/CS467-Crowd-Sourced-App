import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';
import styles from '../style.js';


const ShoppingList = () => {
// list component for the whole shopping list
    // TODO: replace this with data pulled from the database
    const list_data = ["tomato sauce", "potatoes", "cherries", "chicken"]
    const long_list = ["tomato sauce", "potatoes", "cherries", "chicken", "bread crumbs", "tuna", "bell peppers", "coffee", "peanuts"]
    return(
        <FlatList style={{marginTop: 10}}
            data={long_list}
            renderItem = { ({item}) =>
                <Text style={home_style.listItem}>
                    {item}
                </Text>
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

        <NavigationBar/>
    </SafeAreaView>
  );
};

export default HomeScreen;




const home_style = StyleSheet.create({
   listItem: {
       color: styles.textColor.color,
       fontFamily: styles.fontMedium.fontFamily,

       borderWidth: 1,
       borderRadius: 5,
       borderColor: styles.borderColor.color,

       padding: 12,
       margin: 6,

       backgroundColor: styles.itemBackground.color
   },
   addButton: {
       fontSize: 24,
       color: styles.secondaryTextColor.color,
       fontFamily: styles.fontBold.fontFamily,

       borderWidth: 1,
       borderRadius: 15,
       borderColor: styles.borderColor.color,

       paddingLeft: 26,
       paddingRight: 24,
       margin: 6,

       alignSelf: 'flex-end',

       backgroundColor: styles.secondaryItemBackground.color
   },
   shopButton: {
       fontSize: 24,
       color: styles.secondaryTextColor.color,
       fontFamily: styles.fontBold.fontFamily,
       textAlign: 'center',

       width: '80%',
       minHeight: '9.75%',

       borderWidth: 1,
       borderRadius: 20,
       borderColor: styles.borderColor.color,

       padding: 12,
       margin: 6,

       alignSelf: 'center',

       backgroundColor: styles.secondaryItemBackground.color
   }
});