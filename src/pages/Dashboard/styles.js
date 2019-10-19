import styled from 'styled-components/native';
import Colors from '~/themes/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScroll: false,
  contentContainerStyle: {
    padding: 30,
  },
})``;

export const NoMeetup = styled.Text`
  font-weight: bold;
  color: ${Colors.defaultText};
  font-size: 20px;
`;

export const Content = styled.View`
  background: #fff;
  border-radius: 4px;

  margin-bottom: 15px;
  padding-bottom: 15px;
`;

export const InfoContent = styled.View`
  justify-content: center;
  padding: 5px 10px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;
`;

export const InfoTextIcon = styled.View`
  flex-direction: row;

  align-items: center;
  align-content: center;
  padding-bottom: 10px;
  padding-left: 1px;
`;

export const InfoText = styled.Text`
  font-size: 13px;
  padding-left: 5px;
  color: ${Colors.infoColor};
`;
