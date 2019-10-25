import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, List, NoSubscription } from './styles';
import Header from '~/components/Header';

import MeetUp from '~/components/MeetUp';
import { loadSubscriptions } from '~/services/MeetupAPI';
import FooterIndicator from '~/components/FooterIndicator';
import { unsubscribeRequest } from '~/store/modules/meetup/actions';

function Subscriptions({ isFocused }) {
  const dispatch = useDispatch();

  const [subscription, setSubscription] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshing, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getResponse(pageNumber) {
    setLoading(true);
    return loadSubscriptions(pageNumber).then(response => {
      setLoading(false);
      return response;
    });
  }

  function generateTotalPage(response) {
    setTotalPages(response.headers['x-total-page'] || 0);
  }

  const fetchSubscriptions = async (pageNumber = page, sholdRefresh) => {
    if (totalPages && pageNumber > totalPages) return;
    const response = await getResponse(pageNumber);

    const { data } = response;

    generateTotalPage(response);

    if (data.length > 0) {
      setSubscription(sholdRefresh ? data : [...subscription, ...data]);
      setPage(pageNumber + 1);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setSubscription([]);
      fetchSubscriptions(1, true);
    }
  }, [isFocused]); // eslint-disable-line

  async function onEndReached() {
    await fetchSubscriptions();
  }

  async function onRefresh() {
    setRefresh(true);
    await fetchSubscriptions(1, true);
    setRefresh(false);
  }

  function unsubscribeToMeetup(id) {
    dispatch(unsubscribeRequest(id));

    const updatedSubscriptions = subscription.filter(sub => {
      return sub.id !== id;
    });

    setSubscription(updatedSubscriptions);
  }

  return (
    <>
      <Header />
      <Container>
        <List
          data={subscription}
          keyExtractor={item => String(item.id)}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          ListFooterComponent={loading && <FooterIndicator />}
          ListEmptyComponent={
            !loading &&
            !refreshing && (
              <NoSubscription>Sem Inscrições cadastradas</NoSubscription>
            )
          }
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
    </>
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
