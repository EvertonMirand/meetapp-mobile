import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';

import { FormInput } from './styles';
import Button from '~/components/Button';
import SignForm from '~/components/SignForm';
import { signInRequest } from '~/store/modules/auth/action';
import Colors from '~/themes/Colors';

const schema = Yup.object().shape({
  password: Yup.string().required('A senha é obrigatória'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    schema
      .validate({
        email,
        password,
      })
      .then(() => {
        dispatch(signInRequest(email, password));
      })
      .catch(err => {
        showMessage({
          message: 'Dados invalidos!',
          description: err.message,
          type: 'danger',
        });
      });
  }

  return (
    <SignForm
      linkText="Criar conta grátis"
      onPressLink={() => navigation.navigate('SignUp')}
    >
      <StatusBar
        backgroundColor={Colors.backgroundPrimary}
        barStyle="light-content"
      />
      <FormInput
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Digite seu e-mail"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        value={email}
        onChangeText={setEmail}
      />

      <FormInput
        secureTextEntry
        placeholder="Sua senha secreta"
        ref={passwordRef}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleSubmit} loading={loading}>
        Entrar
      </Button>
    </SignForm>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
