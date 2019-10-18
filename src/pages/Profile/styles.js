import styled from 'styled-components/native';
import Input from '~/components/Input';
import Colors from '~/themes/Colors';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 30,
  },
})`
  align-self: stretch;
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

export const UpdateButton = styled(Button)`
  margin-top: 10px;
`;

export const LogOutButton = styled(Button)`
  margin-top: 10px;
  height: 45px;
`;
