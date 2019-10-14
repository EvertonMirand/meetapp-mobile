import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { FormInput } from './styles';
import SignForm from '~/components/SignForm';
import Button from '~/components/Button';

export default function SignUp({ navigation }) {
  const passwordRef = useRef();
  const emailRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {}

  return (
    <SignForm
      linkText="Já tenho login"
      onPressLink={() => navigation.navigate('SignIn')}
    >
      <FormInput
        autoCorrect={false}
        autoCapitalize="none"
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
      <Button onPress={handleSubmit}>Criar conta</Button>
    </SignForm>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
