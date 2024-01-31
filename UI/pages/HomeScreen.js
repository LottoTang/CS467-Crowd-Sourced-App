import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';
import NavigationBar from '../components/NavigationBar.js';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { viewSelectedItem } from '../../redux/actions/actions.js';
import { useNavigation } from '@react-navigation/native';
import styles, {item_style, text_styles, add_button} from '../style.js';



const ShoppingList = () => {
// list component for the whole shopping list
    // TODO: replace this with data pulled from the database
    // populate the list with items in the state. Right now using fake data 
    const state = useSelector((state)=> state.shoppingList);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSelectedItem = (item)=>{
        dispatch(viewSelectedItem(item));
        navigation.navigate('TestViewProduct');
    };
    return(
        <FlatList
            data={state}
            renderItem = { ({item}) =>(
                <Pressable onPress={()=> handleSelectedItem(item)}>
                    <Text style={item_style}>
                        {item.name}
                    </Text>
                </Pressable>
            )}
        />
    )
}


function HomeScreen({navigation}) {
// the Home screen itself with its components

// Adding temp functionality for Go Shopping and + buttons so we can navigate to the new pages
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View  style={{maxHeight: '85%'}}>
                <ShoppingList />

                <Pressable onPress={()=> navigation.navigate("Add Items")}>
                    <Text style={addButton}>+</Text>
                </Pressable>
            </View>

            <View style={styles.bottom}>
                <Pressable onPress={()=>navigation.navigate("TestStoreRec")}>
                <Text style={shopButton}>
                    Go Shopping!
                </Text>
                </Pressable>
            </View>
        </View>

        <NavigationBar/>
    </SafeAreaView>
  );
};

export default HomeScreen;




const home_style = StyleSheet.create({
   addButton: {
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

const addButton = add_button.concat(home_style.addButton);
const shopButton = [home_style.shopButton, text_styles.button]