// Creating the first reducer

import { testItemsList, testList2, sampleData } from "../../testData/testingData";
import { user, products, stores, promotions, items, generateShoppingList } from "../../testData/testingData2";


// Using test list now until database connection is ready
const initial_state = {
    user: {},
    selected_item: null,
    shopping_list_content: {}
};


const homepageReducer = (state= initial_state, action) =>{
    switch (action.type){
        case "VIEW_ITEM":
            return {
                ...state,
                selected_item: action.payload,
            };

        case "SET_USER":
            return {
                ...state,
                user: action.payload.user,
            }

        case "SHOPPING_LIST_CONTENT":
            return {
                ...state,
                shopping_list_content: action.payload.shopping_list_content
            }
        default:
            return state;
    }
};


export {homepageReducer};