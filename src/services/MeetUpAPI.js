import { Platform } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from './api';

const isAndroid = Platform.OS === 'android';

function dateFormatted(date) {
  return format(parseISO(date), "dd 'de' MMMM 'às' HH'h'", {
    locale: pt,
  });
}

function androidUrlReplace(url) {
  return url.replace('localhost', '172.18.108.40');
}

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
        meetup.File.url = androidUrlReplace(File.url);
      }
    }

    meetup.formattedDate = dateFormatted(date);
  });

  return response;
}

export async function loadSubscriptions(page) {
  const response =
    (await api.get('subscriptions', {
      params: {
        page,
      },
    })) || [];

  response.data.map(subscription => {
    const { File, date } = subscription.Meetup;
    if (isAndroid) {
      if (File) {
        subscription.Meetup.File.url = androidUrlReplace(File.url);
      }
    }

    subscription.Meetup.formattedDate = dateFormatted(date);
  });

  return response;
}
