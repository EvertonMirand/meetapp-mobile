import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import Colors from '~/themes/Colors';

import { Container, InfoText } from './styles';

export default function InfoTextIcon({ iconName, children }) {
  return (
    <Container>
      <Icon name={iconName} color={Colors.infoColor} size={14} />
      <InfoText>{children}</InfoText>
    </Container>
  );
}

InfoTextIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};
