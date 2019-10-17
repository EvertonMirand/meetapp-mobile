import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadSubscriptions } from '~/services/MeetUpAPI';

function Subscriptions({ isFocused }) {
  const dispatch = useDispatch();

  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      const data = await loadSubscriptions();
      console.tron.log(data);
      setSubscription(data);
    };
    if (isFocused) {
      fetchMeetups();
    }
  }, [isFocused]);

  function unsubscribeToMeetup(id) {
    // dispatch(subscribeRequest(id));
  }

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={subscription}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetUp
              buttonText="Cancelar inscrição"
              item={item.Meetup}
              onPressButton={() => {
                unsubscribeToMeetup(item.id);
              }}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
