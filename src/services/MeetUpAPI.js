import { Platform } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from './api';

const isAndroid = Platform.OS === 'android';

export async function loadMeetups(dateParam, page) {
  const response =
    (await api.get('meetups', {
      params: {
        date: dateParam.toISOString(),
        page,
      },
    })) || [];

  response.data.map(meetup => {
    const { File, date } = meetup;
    if (isAndroid) {
      if (File) {
        meetup.File.url = File.url.replace('localhost', '10.0.0.100');
      }
    }

    meetup.formattedDate = format(parseISO(date), "dd 'de' MMMM 'às' HH'h'", {
      locale: pt,
    });
  });

  return response.data;
}

export async function loadSubscriptions() {
  const response = (await api.get('subscriptions')) || [];
  console.tron.log(response);

  response.data.map(subscription => {
    const { File, date } = subscription.Meetup;
    if (isAndroid) {
      if (File) {
        subscription.Meetup.File.url = File.url.replace(
          'localhost',
          '10.0.0.100'
        );
      }
    }

    subscription.Meetup.formattedDate = format(
      parseISO(date),
      "dd 'de' MMMM 'às' HH'h'",
      {
        locale: pt,
      }
    );
  });

  return response.data;
}
