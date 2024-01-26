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
import styles, {item_style, text_styles} from '../style.js';



function AddItems() {
// the Add Item screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <Text style={text_styles.smallTitle}>Search</Text>
            <TextInput
                style={item_style.style}
                placeholder='Search for an item'
            />
        </View>

        <NavigationBar/>
    </SafeAreaView>
  );
};

export default AddItems;




const add_style = StyleSheet.create({
});