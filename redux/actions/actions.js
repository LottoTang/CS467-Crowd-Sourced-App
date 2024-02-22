// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, NEW_SHOPPING_LIST, STORE_RECOMMENDATIONS, DELETE_ITEM, SET_USER} from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

// Use to add an item in shopping list
const addItemInShoppingList = (name, brands) => {
    return {
        type: ADD_ITEM,
        payload: {name: name, brands: brands},
    };
};

const viewSelectedItem = (item) =>{
    return {
        type: VIEW_ITEM,
        payload: item,
    };
};

// create new shopping list
const createNewShoppingList = () =>{
    return {
        type: NEW_SHOPPING_LIST,
        payload: testNewShoppingList,
    };
};

// Delete an item from shopping list
const deleteItemInShoppingList = (item)=>{
    return {
        type: DELETE_ITEM,
        payload: item,
    };
};

// Set the user data after they've logged in
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: {user: user},
    };
};

export {addItemInShoppingList, viewSelectedItem, createNewShoppingList, deleteItemInShoppingList, setUser};
