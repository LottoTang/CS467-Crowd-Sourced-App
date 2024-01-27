// Creating the first reducer

import { ADD_ITEM } from "../actions/actionTypes";
import { testItemsList } from "../../testData/testingData";


// Using test list now until database connection is ready
const initialState = {
    numOfItems: 0,
    shoppingListId: 1,
    userId: 123,
    shoppingList: testItemsList,
    selectedItem: null,
};


const homepageReducer = (state= initialState, action) =>{
    switch (action.type){
        case "ADD_ITEM":
            return {
                ...state,
                numOfItems : state.numOfItems + 1,
                shoppingList : [
                    ...state.shoppingList,
                    action.payload
                ]
            };
        case "VIEW_ITEM":
            return {
                ...state,
                selectedItem: action.payload,
            };
        case "NEW_SHOPPING_LIST":
            return {
                ...state,
                shoppingListId: action.payload.shoppingListId,
                userId: action.payload.userId,
                shoppingList: action.payload.shoppingList
            };
        default:
            return state;
    }
};


export {homepageReducer};