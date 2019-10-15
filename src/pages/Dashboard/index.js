import React from 'react';

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  List,
  Content,
  Banner,
  InfoContent,
  Title,
  InfoText,
  InfoTextIcon,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Button from '~/components/Button';
import Colors from '~/themes/Colors';

const meetapp = [1, 2, 3, 4, 5];

function Dashboard({ isFocused }) {
  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetapp}
          keyExtractor={item => String(item)}
          renderItem={item => (
            <Content>
              <Banner
                source={{
                  uri:
                    'https://help.meetup.com/hc/article_attachments/360003122731/1_IEWB6sdRfc_gCwtSwwBT5Q.jpeg',
                }}
              />
              <InfoContent>
                <Title>Meetup de React Native</Title>
                <InfoTextIcon>
                  <Icon name="event" color={Colors.infoColor} size={14} />
                  <InfoText>24 de Junho, às 20h</InfoText>
                </InfoTextIcon>

                <InfoTextIcon>
                  <Icon name="place" color={Colors.infoColor} size={14} />
                  <InfoText>Rua Guilherme Gembal</InfoText>
                </InfoTextIcon>

                <InfoTextIcon>
                  <Icon name="person" color={Colors.infoColor} size={14} />
                  <InfoText>Organizador: Diego F</InfoText>
                </InfoTextIcon>

                <Button>Realizar inscrição</Button>
              </InfoContent>
            </Content>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
