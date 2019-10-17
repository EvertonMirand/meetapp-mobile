import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import PageSelect from '~/components/PageSelect';
import { loadMeetups } from '~/services/MeetUpAPI';
import DatePage from '~/components/DatePage';
import { subscribeRequest } from '~/store/modules/meetup/actions';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();

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

  function subscribeToMeetup(id) {
    dispatch(subscribeRequest(id));
  }

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
              onPressButton={() => {
                subscribeToMeetup(item.id);
              }}
            />
          )}
        />
      </Container>
      <PageSelect
        page={page}
        onChangePage={setPage}
        disabledLeft={page === 1}
        disabledRight={meetups.length < 10}
      />
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
