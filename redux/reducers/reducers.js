// Creating the first reducer

import { testItemsList, testList2, sampleData } from "../../testData/testingData";
import { products, stores, promotions, items, generateShoppingList } from "../../testData/testingData2";


// Using test list now until database connection is ready
const initial_state = {
    num_items: 0,
    shopping_list_id: 1,
    user_id: 123,
    shopping_list: generateShoppingList(),
    selected_item: null,
    all_items: items,
    all_products: products,
    all_stores: stores,
    all_promotions: promotions
};


const homepageReducer = (state= initial_state, action) =>{
    switch (action.type){
        case "ADD_ITEM":
            const new_list = {...state.shopping_list}
            const items = []
            for (const item_id of Object.keys(state.all_items)){
                const item = state.all_items[item_id]
                const product = state.all_products[item.product].name
                if (product == action.payload.name) {
                    if (action.payload.brands.includes(item.brand)) items.push(item_id)
                }
            }
            new_list[action.payload.name] = items
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
        case "NEW_SHOPPING_LIST":
            return {
                ...state,
                shopping_list_id: action.payload.shopping_list_id,
                user_id: action.payload.user_id,
                shopping_list: action.payload.shopping_list
            };

        default:
            return state;
    }
};


export {homepageReducer};