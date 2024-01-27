// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, NEW_SHOPPING_LIST } from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

const addItemInShoppingList = (name, brand) => {
    return {
        type: ADD_ITEM,
        payload: {name, brand},
    };
};

const viewSelectedItem = (item) =>{
    return {
        type: VIEW_ITEM,
        payload: item,
    };
};

const createNewShoppingList = () =>{
    return {
        type: NEW_SHOPPING_LIST,
        payload: testNewShoppingList,
    };
};

export {addItemInShoppingList, viewSelectedItem, createNewShoppingList};