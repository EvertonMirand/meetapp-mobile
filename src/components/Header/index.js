import React from 'react';
import { Container } from './styles';
import AppLogo from '../AppLogo';

export default function Header() {
  return (
    <Container>
      <AppLogo size={24} />
    </Container>
  );
}
