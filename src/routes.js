import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const Sign = createSwitchNavigator({
  SignIn,
  SignUp,
});

const App = createBottomTabNavigator({
  Dashboard,
});

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign,
        App,
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
