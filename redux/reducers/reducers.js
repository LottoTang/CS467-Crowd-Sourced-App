// Creating the first reducer

import { testItemsList, testList2, sampleData } from "../../testData/testingData";
import { products, stores, promotions, items, generateShoppingList } from "../../testData/testingData2";


// Using test list now until database connection is ready
const initialState = {
    numOfItems: 0,
    shoppingListId: 1,
    userId: 123,
    shoppingList: generateShoppingList(),
    selectedItem: null,
    allItems: items,
    products: products,
    allStores: stores,
    allPromotions: promotions
};


const homepageReducer = (state= initialState, action) =>{
    switch (action.type){
        case "ADD_ITEM":
            const new_list = {...state.shoppingList}
            const items = []
            for (const item_id of Object.keys(state.allItems)){
                const item = state.allItems[item_id]
                const product = state.products[item.product].name
                if (product == action.payload.name) {
                    if (action.payload.brands.includes(item.brand)) items.push(item_id)
                }
            }
            new_list[action.payload.name] = items
            return {
                ...state,
                numOfItems : state.numOfItems + 1,
                shoppingList : new_list
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

        case "DELETE_ITEM":
            
            const newList = Object.fromEntries(Object.entries(state.shoppingList).filter(([key, value])=>{
                return key != action.payload;
            }));

            return {
                ...state,
                shoppingList: newList,
            }
        default:
            return state;
    }
};


export {homepageReducer};