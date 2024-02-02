// File to handle all actions for redux

import { ADD_ITEM, VIEW_ITEM, NEW_SHOPPING_LIST, STORE_RECOMMENDATIONS, SELECTED_BRAND, DROP_SELECTED_BRAND } from "./actionTypes";
import { RESET_BRANDS_LIST, EDIT_ITEM, EDITING } from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

const addItemInShoppingList = (name, brand) => {
    //console.log(brand);
    return {
        type: ADD_ITEM,
        payload: {name: name, brand: brand},
    };
};

const editItemInShoppingList = (name, brand) =>{
    return {
        type: EDIT_ITEM,
        payload: {name, brand},
    }
};

const setEditingItem = (value) =>{
    return {
        type: EDITING,
        payload: value,
    }
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

const selectBrandItem = (brand) => {
    return {
        type: SELECTED_BRAND,
        payload: brand,
    }
}

const dropSelectedBrand = (selectedBrand) => {
    return {
        type: DROP_SELECTED_BRAND,
        payload: selectedBrand,
    }
}

const resetSelectedBrand = () => {
    return {
        type: RESET_BRANDS_LIST,
        payload: [],
    }
}

export {addItemInShoppingList, viewSelectedItem, createNewShoppingList, selectBrandItem, dropSelectedBrand, resetSelectedBrand};
export {editItemInShoppingList, setEditingItem };