import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import logo from '~/assets/logo.png';

export default function AppLogo({ size }) {
  return <Image source={logo} width={size} height={size} />;
}

AppLogo.propTypes = {
  size: PropTypes.number,
};

AppLogo.defaultProps = {
  size: 42,
};
