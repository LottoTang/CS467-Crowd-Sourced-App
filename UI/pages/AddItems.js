import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';
import styles, {item_style} from '../style.js';



function AddItems() {
// the Add Item screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <TextInput
                style={item_style.style}
                defaultValue='Search'
            />
        </View>

        <NavigationBar/>
    </SafeAreaView>
  );
};

export default AddItems;




const add_style = StyleSheet.create({
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
});