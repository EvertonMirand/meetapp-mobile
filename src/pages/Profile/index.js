import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  FormInput,
  Separator,
  Form,
  LogOutButton,
  UpdateButton,
} from './styles';
import Background from '~/components/Background';
import Header from '~/components/Header';
import { signOut } from '~/store/modules/auth/action';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector(state => {
    return state.user.profile;
  });
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleUpdateProfile() {
    const data = {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
    };

    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
    dispatch(updateProfileRequest(data));
  }

  return (
    <>
      <Header />
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="words"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            secureTextEntry
            placeholder="Senha atual"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={oldPasswordRef}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Nova senha"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de senha"
            returnKeyType="send"
            onSubmitEditing={handleUpdateProfile}
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <UpdateButton onPress={handleUpdateProfile}>
            Salvar perfil
          </UpdateButton>
          <LogOutButton darker onPress={handleSignOut}>
            Sair do Meetapp
          </LogOutButton>
        </Form>
      </Container>
    </>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
