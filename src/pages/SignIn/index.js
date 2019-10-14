import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { FormInput } from './styles';
import Button from '~/components/Button';
import SignForm from '~/components/SignForm';
import { signInRequest } from '~/store/modules/auth/action';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <SignForm
      linkText="Criar conta grátis"
      onPressLink={() => navigation.navigate('SignUp')}
    >
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
