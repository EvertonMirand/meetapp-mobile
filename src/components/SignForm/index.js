import React from 'react';

import PropTypes from 'prop-types';

import { Container, Form, LinkButton, LinkText } from './styles';
import AppLogo from '../AppLogo';

export default function SignForm({ linkText, onPressLink, children }) {
  return (
    <Container>
      <AppLogo />
      <Form>{children}</Form>

      <LinkButton onPress={onPressLink}>
        <LinkText>{linkText}</LinkText>
      </LinkButton>
    </Container>
  );
}

SignForm.propTypes = {
  onPressLink: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  linkText: PropTypes.string.isRequired,
};
