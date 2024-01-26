import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from '../reducers/reducers';

const store = configureStore({
    reducer: shoppingReducer
})
//store.dispatch({type: "shoppingList/add_item"});

export default store;