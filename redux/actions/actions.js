// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, NEW_SHOPPING_LIST, STORE_RECOMMENDATIONS, SELECTED_BRAND, DROP_SELECTED_BRAND } from "./actionTypes";
import { RESET_BRANDS_LIST, EDIT_ITEM, EDITING } from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

// Use to add an item in shopping list
const addItemInShoppingList = (name, brand) => {
    //console.log(brand);
    return {
        type: ADD_ITEM,
        payload: {name: name, brand: brand},
    };
};

// used to update an item in shopping list
const editItemInShoppingList = (name, brand) =>{
    return {
        type: EDIT_ITEM,
        payload: {name, brand},
    }
};

// used to set true or false if an item is getting edited
const setEditingItem = (value) =>{
    return {
        type: EDITING,
        payload: value,
    }
};

// Returns the item being edited
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

// Captures the brands to be added to an item
const selectBrandItem = (brand) => {
    return {
        type: SELECTED_BRAND,
        payload: brand,
    }
}

// Removes a brand from the list of selected brands
const dropSelectedBrand = (selectedBrand) => {
    return {
        type: DROP_SELECTED_BRAND,
        payload: selectedBrand,
    }
}

// Resets to an empty list all brands that have been selected before
const resetSelectedBrand = () => {
    return {
        type: RESET_BRANDS_LIST,
        payload: [],
    }
}

export {addItemInShoppingList, viewSelectedItem, createNewShoppingList, selectBrandItem, dropSelectedBrand, resetSelectedBrand};
export {editItemInShoppingList, setEditingItem };