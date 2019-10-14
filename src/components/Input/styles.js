import styled from 'styled-components/native';
import Colors from '~/themes/Colors';

export const Container = styled.View`
  padding: 0 15px;
  height: 50px;
  background: ${Colors.inputBackground};
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: Colors.placeholder,
})`
  flex: 1;
  font-size: 18px;
  margin-left: 5px;
  color: ${Colors.defaultText};
`;
