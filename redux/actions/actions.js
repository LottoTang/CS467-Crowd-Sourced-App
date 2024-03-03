// File to handle all actions for redux

import { VIEW_ITEM, SET_USER, SHOPPING_LIST_CONTENT } from "./actionTypes";
import { testNewShoppingList } from "../../testData/testingData";

const viewSelectedItem = (item) =>{
    return {
        type: VIEW_ITEM,
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

export { viewSelectedItem, setUser, setShoppingListContent };
