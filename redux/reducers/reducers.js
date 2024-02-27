// Creating the first reducer

import { testItemsList, testList2, sampleData } from "../../testData/testingData";
import { user, products, stores, promotions, items, generateShoppingList } from "../../testData/testingData2";


// Using test list now until database connection is ready
const initial_state = {
    num_items: 0,
    shopping_list_id: 1,
    user: {},
    //shopping_list: generateShoppingList(),
    shopping_list: {},
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
            /*
            for (const item_id of Object.keys(state.all_items)){
                const item = state.all_items[item_id]
                const product = state.all_products[item.product].name

                const store_id = item.store
                const store = stores[store_id]

                if (product == action.payload.name) {
                    if (action.payload.brands.includes(item.brand)) {
                        if (store.city == user.city && store.state == user.state) items.push(item_id)
                    }
                }
            }
            */
            //new_list[action.payload.name] = items
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
        case "NEW_SHOPPING_LIST":
            return {
                ...state,
                shopping_list_id: action.payload.shopping_list_id,
                user_id: action.payload.user_id,
                shopping_list: action.payload.shopping_list
            };

        case "DELETE_ITEM":
            
            const newList = Object.fromEntries(
                Object.entries(state.shopping_list).filter(([key, value])=>{
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
        default:
            return state;
    }
};


export {homepageReducer};