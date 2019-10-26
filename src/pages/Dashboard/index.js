import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List, NoMeetup } from './styles';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadMeetups } from '~/services/MeetupAPI';
import DatePage from '~/components/DatePage';
import { subscribeRequest } from '~/store/modules/meetup/actions';
import FooterIndicator from '~/components/FooterIndicator';
import Colors from '~/themes/Colors';

function Dashboard({ isFocused }) {
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [meetups, setMeetup] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getResponse(pageNumber) {
    setLoading(true);
    return loadMeetups(date, pageNumber).then(response => {
      setLoading(false);
      return response;
    });
  }

  function generateTotalPage(response) {
    setTotalPages(response.headers['x-total-page'] || 0);
  }

  async function fetchMeetups(pageNumber = page, shouldRefresh = false) {
    if (totalPages !== 0 && pageNumber > totalPages) return;

    const response = await getResponse(pageNumber);

    const { data } = response;

    generateTotalPage(response);

    setMeetup(shouldRefresh ? data : [...meetups, ...data]);
    setPage(pageNumber + 1);
  }

  async function whenDateChange() {
    if (isFocused) {
      setMeetup([]);
      await fetchMeetups(1, true);
    }
  }

  useEffect(() => {
    whenDateChange();
  }, [date, isFocused]); // eslint-disable-line

  async function onEndReached() {
    await fetchMeetups();
  }

  async function onRefresh() {
    setRefresh(true);
    await fetchMeetups(1, true);
    setRefresh(false);
  }

  function mapDateSubscribed(meetup, item) {
    const canSubscribe = meetup.date !== item.date;
    if (!meetup.canSubscribe) {
      return meetup;
    }

    return {
      ...meetup,
      canSubscribe,
    };
  }

  async function subscribeToMeetup(item) {
    await Promise.all([dispatch(subscribeRequest(item.id))]).then(() => {
      setMeetup(meetups.map(meetup => mapDateSubscribed(meetup, item)));
    });
  }

  function onChangeDate(dateChanged) {
    setTotalPages(0);
    setDate(dateChanged);
  }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.loggedStatusBar}
        barStyle="light-content"
      />
      <Header />
      <DatePage date={date} onChangeDate={onChangeDate} />
      <Container>
        <List
          data={meetups}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <FooterIndicator />}
          ListEmptyComponent={
            !loading &&
            !refreshing && (
              <NoMeetup>Sem meetups encontradas nesse dia</NoMeetup>
            )
          }
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MeetUp
              subscribe
              buttonText="Realizar inscrição"
              item={item}
              onPressButton={async () => {
                await subscribeToMeetup(item);
              }}
            />
          )}
        />
      </Container>
    </>
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
