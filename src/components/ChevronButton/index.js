import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Colors from '~/themes/Colors';

export default function ChevronButton({ direction, onPress, color, disabled }) {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Icon
        name={`chevron-${direction}`}
        size={30}
        color={disabled ? Colors.opacityIcon : color}
      />
    </Container>
  );
}

ChevronButton.propTypes = {
  direction: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

ChevronButton.defaultProps = {
  color: Colors.defaultIcon,
  disabled: false,
};
