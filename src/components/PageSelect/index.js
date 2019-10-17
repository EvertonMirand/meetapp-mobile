import React from 'react';

import PropTypes from 'prop-types';

import { Container, PageText } from './styles';
import ChevronButton from '../ChevronButton';

export default function DatePage({
  onChangePage,
  page,
  disabledLeft,
  disabledRight,
}) {
  function onPressLeft() {
    onChangePage(page - 1);
  }

  function onPressRight() {
    onChangePage(page + 1);
  }

  return (
    <Container>
      <ChevronButton
        direction="left"
        onPress={onPressLeft}
        disabled={disabledLeft}
      />
      <PageText>{page}</PageText>
      <ChevronButton
        direction="right"
        onPress={onPressRight}
        disabled={disabledRight}
      />
    </Container>
  );
}

DatePage.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  disabledLeft: PropTypes.bool.isRequired,
  disabledRight: PropTypes.bool.isRequired,
};
