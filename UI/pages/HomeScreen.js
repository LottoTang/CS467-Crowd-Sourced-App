// react imports
import React from 'react';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// function imports
import { viewSelectedItem } from '../../redux/actions/actions.js';

// style imports
import styles, {item_style, text_styles, add_button, large_button} from '../style.js';


const ShoppingList = () => {
// list component for the whole shopping list

    // populate the list with items in the state. Right now using fake data 
    const shopping_list = useSelector((state)=> state.user.shopping_list_item);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const handleSelectedItem = (item)=>{
        dispatch(viewSelectedItem(item));
        navigation.navigate('View Item', {deletable: true, product: item});
    };
    return(
        <FlatList
            data={Object.keys(shopping_list)}
            renderItem = { ({item}) =>(
                <Pressable style={item_style} onPress={()=> handleSelectedItem(item)}>
                    <Text style={text_styles.itemText}>
                        {item}
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
            <View  style={{maxHeight: '87%'}}>
                <ShoppingList />

                <Text style={addButton} onPress={()=> navigation.navigate("Add Items")}>+</Text>
            </View>

            <View style={styles.bottom}>
                <Text style={large_button} onPress={()=>navigation.navigate("View Store Recs")}>
                    Go Shopping!
                </Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;




const home_style = StyleSheet.create({
   addButton: {
       margin: 6,
       alignSelf: 'flex-end',
   }
});

const addButton = add_button.concat(home_style.addButton);