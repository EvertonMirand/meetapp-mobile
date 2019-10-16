import React from 'react';

import { Content, Banner, InfoContent, Title } from './styles';
import InfoTextIcon from '../InfoTextIcon';
import Button from '../Button';

export default function MeetUp({ item, buttonText, onPressButton }) {
  const { title, date, location, User } = item;
  const { name } = User;

  return (
    <Content>
      <Banner
        source={{
          uri:
            'https://help.meetup.com/hc/article_attachments/360003122731/1_IEWB6sdRfc_gCwtSwwBT5Q.jpeg',
        }}
      />
      <InfoContent>
        <Title>{title}</Title>
        <InfoTextIcon iconName="event">{date}</InfoTextIcon>

        <InfoTextIcon iconName="place">{location}</InfoTextIcon>

        <InfoTextIcon iconName="person">Organizador: {name}</InfoTextIcon>

        <Button onPress={onPressButton}>{buttonText}</Button>
      </InfoContent>
    </Content>
  );
}
