import React from 'react';

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';

const meetapp = [1, 2, 3, 4, 5];

function Dashboard({ isFocused }) {
  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetapp}
          keyExtractor={item => String(item)}
          renderItem={item => <MeetUp />}
        />
      </Container>
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
