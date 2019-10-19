import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List, NoMeetup } from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadMeetups } from '~/services/MeetupAPI';
import DatePage from '~/components/DatePage';
import { subscribeRequest } from '~/store/modules/meetup/actions';
import FooterIndicator from '~/components/FooterIndicator';

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

  useEffect(() => {
    async function whenDateChange() {
      if (isFocused) {
        setRefresh(true);
        setMeetup([]);
        await fetchMeetups(1, true);
        setRefresh(false);
      }
    }
    whenDateChange();
  }, [date, isFocused]); // eslint-disable-line

  function subscribeToMeetup(id) {
    dispatch(subscribeRequest(id));
  }

  async function onEndReached() {
    await fetchMeetups();
  }

  async function onRefresh() {
    setRefresh(true);
    await fetchMeetups(1, true);
    setRefresh(false);
  }

  function onChangeDate(dateChanged) {
    setTotalPages(0);
    setDate(dateChanged);
  }

  return (
    <Background>
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
