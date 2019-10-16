import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadMeetups } from '~/services/MeetUpAPI';
import DatePage from '~/components/DatePage';

function Dashboard({ isFocused }) {
  const [page, setPage] = useState(1);
  const [meetups, setMeetup] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchMeetups = async () => {
      const data = await loadMeetups(date, page);

      setMeetup(data);
    };
    if (isFocused) {
      fetchMeetups();
    }
  }, [date, isFocused, page]);

  return (
    <Background>
      <Header />
      <DatePage date={date} onChangeDate={setDate} />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetUp
              buttonText="Realizar inscrição"
              item={item}
              onPressButton={() => {}}
            />
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
