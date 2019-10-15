import React from 'react';

import { Content, Banner, InfoContent, Title } from './styles';
import InfoTextIcon from '../InfoTextIcon';
import Button from '../Button';

export default function MeetUp({ item, buttonText, onPressButton }) {
  return (
    <Content>
      <Banner
        source={{
          uri:
            'https://help.meetup.com/hc/article_attachments/360003122731/1_IEWB6sdRfc_gCwtSwwBT5Q.jpeg',
        }}
      />
      <InfoContent>
        <Title>Meetup de React Native</Title>
        <InfoTextIcon iconName="event">24 de Junho, às 20h</InfoTextIcon>

        <InfoTextIcon iconName="place">Rua Guilherme Gembal</InfoTextIcon>

        <InfoTextIcon iconName="person">Organizador: Diego F</InfoTextIcon>

        <Button onPress={onPressButton}>{buttonText}</Button>
      </InfoContent>
    </Content>
  );
}
