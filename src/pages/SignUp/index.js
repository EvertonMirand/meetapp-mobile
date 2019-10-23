import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FormInput } from './styles';
import SignForm from '~/components/SignForm';
import Button from '~/components/Button';
import { signUpRequest } from '~/store/modules/auth/action';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function onSignUpSucess() {
    navigation.navigate('SignIn');
  }

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password, onSignUpSucess));
  }

  return (
    <SignForm
      linkText="Já tenho login"
      onPressLink={() => navigation.navigate('SignIn')}
    >
      <FormInput
        autoCapitalize="words"
        autoCorrect={false}
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
        onSubmitEditing={() => passwordRef.current.focus()}
        ref={emailRef}
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
        Criar conta
      </Button>
    </SignForm>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
