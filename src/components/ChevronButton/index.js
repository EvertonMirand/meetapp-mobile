import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Colors from '~/themes/Colors';

export default function ChevronButton({ direction, onPress, color }) {
  return (
    <Container onPress={onPress}>
      <Icon name={`chevron-${direction}`} size={30} color={color} />
    </Container>
  );
}

ChevronButton.propTypes = {
  direction: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};

ChevronButton.defaultProps = {
  color: Colors.defaultIcon,
};
