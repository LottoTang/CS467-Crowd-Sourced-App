import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles, {item_style, text_styles, add_button} from '../style.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { viewSelectedItem } from '../../redux/actions/actions.js';
import { useNavigation } from '@react-navigation/native';


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
                <Text style={item_style} onPress={()=> handleSelectedItem(item)}>
                    {item.name}
                </Text>
            )}
        />
    )
}


function HomeScreen({navigation}) {
// the Home screen itself with its components
  return (
    <SafeAreaView style={styles.app}>
        <View style={styles.container}>
            <View  style={{maxHeight: '79%'}}>
                <ShoppingList />
                <Text
                        style={addButton}
                        onPress={() =>
                            navigation.navigate('Add Items')
                        }>
                    +
                </Text>
            </View>

            <View style={styles.bottom}>
                <Text style={shopButton} onPress={()=>navigation.navigate("TestStoreRec")}>
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
       marginTop: 12
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