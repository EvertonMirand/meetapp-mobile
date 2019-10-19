import React from 'react';

import PropTypes from 'prop-types';

import { Content, Banner, InfoContent, Title } from './styles';
import InfoTextIcon from '../InfoTextIcon';
import Button from '../Button';

export default function MeetUp({ item, buttonText, onPressButton, subscribe }) {
  const {
    title,
    formattedDate,
    location,
    User,
    File,
    canSubscribe,
    isPast,
  } = item;
  const { url } = File;
  const { name } = User;

  return (
    <Content>
      <Banner
        source={{
          uri: url,
        }}
      />

      <InfoContent>
        <Title>{title}</Title>
        <InfoTextIcon iconName="event">{formattedDate}</InfoTextIcon>

        <InfoTextIcon iconName="place">{location}</InfoTextIcon>

        <InfoTextIcon iconName="person">Organizador: {name}</InfoTextIcon>

        {(!subscribe || canSubscribe) && !isPast && (
          <Button onPress={onPressButton}>{buttonText}</Button>
        )}
      </InfoContent>
    </Content>
  );
}

MeetUp.propTypes = {
  subscribe: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  onPressButton: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string,
    formattedDate: PropTypes.string,
    location: PropTypes.string,
    canSubscribe: PropTypes.bool,
    isPast: PropTypes.bool,
    User: PropTypes.shape({
      name: PropTypes.string,
    }),
    File: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

MeetUp.defaultProps = {
  subscribe: false,
};
