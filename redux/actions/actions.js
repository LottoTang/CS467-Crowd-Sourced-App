// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, NEW_SHOPPING_LIST, STORE_RECOMMENDATIONS} from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

// Use to add an item in shopping list
const addItemInShoppingList = (name, brand) => {
    //console.log(brand);
    return {
        type: ADD_ITEM,
        payload: {name: name, brand: brand},
    };
};

const viewSelectedItem = (item) =>{
    //console.log(item);
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

export {addItemInShoppingList, viewSelectedItem, createNewShoppingList};
