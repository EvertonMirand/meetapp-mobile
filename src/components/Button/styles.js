import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Colors from '~/themes/Colors';

export const Container = styled(RectButton)`
  height: 50px;
  border-radius: 4px;
  background: ${Colors.buttonBackground};

  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${Colors.defaultText};
  font-weight: bold;
  font-size: 18px;
`;
