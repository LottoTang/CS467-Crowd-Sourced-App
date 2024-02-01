// Creating the first reducer

import { testItemsList, testList2, sampleData } from "../../testData/testingData";


// Using test list now until database connection is ready
const initialState = {
    numOfItems: 0,
    shoppingListId: 1,
    userId: 123,
    shoppingList: testList2,
    selectedItem: null,
    allItems: sampleData,
    selectedBrand: null,
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
        case "SELECTED_BRAND":
            return {
                ...state,
                selectedBrand: action.payload
            }
        case "DROP_SELECTED_BRAND":
            return {
                ...state,
                selectedBrand: null,
            }
        default:
            return state;
    }
};


export {homepageReducer};