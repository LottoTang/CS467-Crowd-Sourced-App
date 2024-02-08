/**
 * Crowd-Sourced Shopping App
 * OSU Course: CS467
 * Authors: drososk@oregonstate.edu, giacobbj@oregonstate.edu, tanglon@oregonstate.edu, harders@oregonstate.edu
 * https://github.com/LottoTang/CS467-Crowd-Sourced-App
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store/store.js';
import { Provider } from 'react-redux';

import appSetup from './UI/app_setup.js'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <NavigationContainer>
        {appSetup()}
    </NavigationContainer>
    </Provider>
  );
}

export default App;
