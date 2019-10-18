import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { darken } from 'polished';
import Colors from '~/themes/Colors';

export const Container = styled(RectButton)`
  height: 50px;
  border-radius: 4px;
  background: ${props =>
    props.darker
      ? darken(0.09, Colors.buttonBackground)
      : Colors.buttonBackground};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${Colors.defaultText};
  font-weight: bold;
  font-size: 18px;
`;
