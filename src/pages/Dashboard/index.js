import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadMeetups } from '~/services/MeetUpAPI';

function Dashboard({ isFocused }) {
  const [meetups, setMeetup] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      const data = await loadMeetups();

      setMeetup(data);
    };
    if (isFocused) {
      fetchMeetups();
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

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
