import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Colors from './themes/Colors';
import Profile from './pages/Profile';

const Sign = createSwitchNavigator({
  SignIn,
  SignUp,
});

const App = createBottomTabNavigator(
  {
    Dashboard,
    Subscriptions,
    Profile,
  },
  {
    resetOnBlur: true,
    statusBarStyle: {
      color: '#fff',
    },
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: Colors.activeBottomTintColor,
      inactiveTintColor: Colors.inactiveBottomTintColor,
      style: {
        backgroundColor: Colors.bootomBarBackground,
      },
    },
  }
);

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
