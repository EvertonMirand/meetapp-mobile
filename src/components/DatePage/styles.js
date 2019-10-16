import styled from 'styled-components/native';
import Colors from '~/themes/Colors';

export const Container = styled.View`
  margin-top: 20px;
  height: 40px;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const DateText = styled.Text`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: bold;
  font-size: 20px;
  color: ${Colors.defaultText};
`;
