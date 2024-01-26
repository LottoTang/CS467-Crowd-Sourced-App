// File to handle all actions for redux

import { ADD_ITEM } from "./actionTypes";

export const addItemInShoppingList = (item_id, store_id, name, brand, category, price) => {
    return {
        type: 'ADDING_ITEM',
        payload: {item_id, store_id, name, brand, category, price},
    };
};

export {addItemInShoppingList};