// Creating the first reducer

import { ADD_ITEM } from "../actions/actionTypes";

const initialState = {
    numOfItems: 0,
    shoppingList: [],
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
        default:
            return state;
    }
};


export {homepageReducer};