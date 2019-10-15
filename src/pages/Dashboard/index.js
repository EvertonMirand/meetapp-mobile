import React from 'react';

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

function Dashboard({ isFocused }) {
  return (
    <Background>
      <Header />
      <Container />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
