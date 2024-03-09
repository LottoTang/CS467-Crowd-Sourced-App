// react imports
import React from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// function imports
import { setUser } from '../../redux/actions/actions.js';

// data imports
import { fetchStores, searchStores } from '../../redux/funtionality/connectionMongo.js';
import { makeLiveFeedPost, updateLastPostDateForUser, increaseItemCount } from '../../redux/funtionality/postPatchFunctions.js';

// component imports
import Dropdown from '../components/Dropdown.js'
import Loading from '../components/LoadingPage.js'

// style imports
import styles, {item_style, text_styles, add_button} from '../style.js';

function PostPage() {
// the Post page screen itself with its components (allows the user to post to the live feed)
    const user = useSelector(state => state.user);

    const [store, setStore] = useState();
    const [review, setReview] = useState();
    const [stores_dict, setStores] = useState({})
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Get all stores from database
    useEffect(()=>{
        const fetchData = async()=>{
            // retrieve all of the stores in the user's area, put them in a dict format {name: id}
            const stores_dict = {}
            const stores = await fetchStores()
            for (const store of stores) {
                stores_dict[store.name] = store._id
            }
            setStores(stores_dict)
            setLoading(false)
        }
        fetchData();
    }, []);

    if (loading){
        return <Loading />
    }
    
    const handlePost = async () => {
        if (store == undefined) Alert.alert("Invalid Store", "Please select a store.", [{text: 'Ok'}] );
        else if (review == undefined) Alert.alert("Invalid Update", "Please write an update.", [{text: 'Ok'}] );
        else {
            // Send post to backend live feeds
            const today = new Date();
            makeLiveFeedPost(null, stores_dict[store], review, null, `${user.username} - ${user.shopping_level}`, today);

            // Update latest post date and feed count for the user
            updateLastPostDateForUser(user._id, new Date());
            const updated_user = await increaseItemCount(user._id);
            const new_level = updated_user.shopping_level
            if (new_level > user.shopping_level) {
                Alert.alert("Congratulations!",
                    `Your shopping level has increased to level ${new_level}: ${level_names[new_level - 1]}`,
                    [{text: 'Great!'}]
                );
            }

            dispatch(setUser(updated_user));
            setStore();
            setReview();

            navigation.navigate("LiveFeed")
        }
    }


    return (
    <SafeAreaView style={styles.app}>
        <View style={[styles.container, {justifyContent: 'center'}]}>

            <Text style={text_styles.smallTitle}>Store</Text>
            <Dropdown
                value={store}
                setValue={setStore}
                options={[]}
                type={"store"}
                searchFunc={searchStores}
            />

            <Text style={text_styles.smallTitle}>Update</Text>
            <View style={item_style.concat({marginBottom: 15})}>
                <TextInput
                    style={text_styles.inputText}
                    value={review}
                    onChangeText={setReview}
                    multiline={true}
                    textAlignVertical={"top"}
                    numberOfLines={3}
                    maxLength={64}
                />
            </View>

            <Text style={[add_button, post_style.addButton]} onPress={handlePost}>
                +
            </Text>
        </View>
    </SafeAreaView>
    );
};

export default PostPage;


const post_style = StyleSheet.create({
    addButton: {
        margin: 6,
        marginTop: 20,
        alignSelf: 'flex-end',
    }
});