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

import pageSetup from './UI/page_setup.js'
import styles from './UI/style.js'

function App(): React.JSX.Element {
  return (
    <NavigationContainer screenOptions={{contentStyle: {backgroundColor: styles.backgroundColor.color}}}>
        {pageSetup()}
    </NavigationContainer>
  );
}

export default App;
