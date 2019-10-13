import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignIn from './pages/SignIn';

const Sign = createSwitchNavigator({
  SignIn,
});

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator({
      Sign,
    })
  );
