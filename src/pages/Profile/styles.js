import styled from 'styled-components/native';
import Input from '~/components/Input';
import Colors from '~/themes/Colors';

export const Container = styled.View`
  padding: 20px 30px;

  flex: 1;
  align-content: center;
  align-items: center;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${Colors.separator};
  margin: 10px 30px;
  width: 100%;
`;
