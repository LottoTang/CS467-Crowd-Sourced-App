// Creating the first reducer

import { createSlice } from "@reduxjs/toolkit";

export const shoppingReducer = createSlice({
    name: 'shoppingList',
    initialState: {
        listContent: []
    },
    reducers: {
        addItem : (state, action)=>{
            state.listContent.push(action.payload)
        }
    }
});

export const {addItem} = shoppingReducer.actions;

export default shoppingReducer.reducer;