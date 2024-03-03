// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, DELETE_ITEM, SET_USER, SHOPPING_LIST_CONTENT } from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

// Use to add an item in shopping list
const addItemInShoppingList = (name, items) => {
    return {
        type: ADD_ITEM,
        payload: {name: name, items: items},
    };
};

const viewSelectedItem = (item) =>{
    return {
        type: VIEW_ITEM,
        payload: item,
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

// Set content of shopping list for the delete function update
const setShoppingListContent = (content) =>{
    return {
        type: SHOPPING_LIST_CONTENT,
        payload: {shopping_list_content: content},
    }
};

export {addItemInShoppingList, viewSelectedItem, deleteItemInShoppingList, setUser, setShoppingListContent};
