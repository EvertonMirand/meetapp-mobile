import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Colors from '~/themes/Colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const LinkButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const LinkText = styled.Text`
  color: ${Colors.defaultText};
  font-weight: bold;
  font-size: 16px;
`;
