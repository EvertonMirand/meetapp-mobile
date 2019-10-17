import React, { useState, useEffect } from 'react';

import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadMeetups } from '~/services/MeetUpAPI';
import DatePage from '~/components/DatePage';
import { subscribeRequest } from '~/store/modules/meetup/actions';
import Colors from '~/themes/Colors';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [meetups, setMeetup] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchMeetups(pageNumber = page, shouldRefresh = false) {
    setLoading(true);
    const data = await loadMeetups(date, pageNumber);
    setLoading(false);
    if (data.length > 0) {
      setMeetup(shouldRefresh ? data : [...meetups, ...data]);
      setPage(pageNumber + 1);
    }
  }

  useEffect(() => {
    if (isFocused) {
      setMeetup([]);
      fetchMeetups(1, true);
    }
  }, [date, isFocused]); // eslint-disable-line

  function subscribeToMeetup(id) {
    dispatch(subscribeRequest(id));
  }

  function onEndReached() {
    fetchMeetups();
  }

  async function onRefresh() {
    setRefresh(true);
    await fetchMeetups(1, true);
    setRefresh(false);
  }

  return (
    <Background>
      <Header />
      <DatePage date={date} onChangeDate={setDate} />
      <Container>
        <List
          data={meetups}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading && <ActivityIndicator color={Colors.defaultIcon} />
          }
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
