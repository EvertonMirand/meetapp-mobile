import React, { useState, useEffect } from 'react';

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import api from '~/services/api';

function Dashboard({ isFocused }) {
  const [meetups, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = (await api.get('meetups')) || [];

      setMeetup(response.data);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetUp buttonText="Realizar inscrição" item={item} />
          )}
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
