import React from 'react';

import PropTypes from 'prop-types';

import { Image } from 'react-native';
import Background from '~/components/Background';
import logo from '~/assets/logo.png';

import { Container, Form, LinkButton, LinkText } from './styles';
import AppLogo from '../AppLogo';

export default function SignForm({ linkText, onPressLink, children }) {
  return (
    <Background>
      <Container>
        <AppLogo />
        <Form>{children}</Form>

        <LinkButton onPress={onPressLink}>
          <LinkText>{linkText}</LinkText>
        </LinkButton>
      </Container>
    </Background>
  );
}

SignForm.propTypes = {
  onPressLink: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  linkText: PropTypes.string.isRequired,
};
