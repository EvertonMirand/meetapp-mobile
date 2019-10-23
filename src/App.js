import React from 'react';

import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import createRouter from './routes';
import Background from './components/Background';

export default function App() {
  const signed = useSelector(state => state.auth.signed);
  const Routes = createRouter(signed);

  return (
    <Background>
      <Routes />
      <FlashMessage position="top" />
    </Background>
  );
}
