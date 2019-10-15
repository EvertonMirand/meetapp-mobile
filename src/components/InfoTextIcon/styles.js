import styled from 'styled-components/native';
import Colors from '~/themes/Colors';

export const Container = styled.View`
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
