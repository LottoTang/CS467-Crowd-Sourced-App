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
        case "ADD_ITEM":
            const new_list = {...state.shopping_list}
            const items = []

            new_list[action.payload.name] = action.payload.items;
            return {
                ...state,
                numOfItems : state.numOfItems + 1,
                shopping_list : new_list
            };

        case "VIEW_ITEM":
            return {
                ...state,
                selected_item: action.payload,
            };

        case "DELETE_ITEM":
            
            const newList = Object.fromEntries(
                Object.entries(state.user.shopping_list_item).filter(([key, value])=>{
                    return key != action.payload;
            }));

            return {
                ...state,
                shopping_list: newList,
            }

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