// This is the store file

import { configureStore } from '@reduxjs/toolkit';
import { homepageReducer } from '../reducers/reducers';

const store = configureStore({
    reducer: homepageReducer,
})

export default store;