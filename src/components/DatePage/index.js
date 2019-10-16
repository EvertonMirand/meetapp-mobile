import React from 'react';

import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, DateText } from './styles';
import ChevronButton from '../ChevronButton';

export default function DatePage({ onChangeDate, date }) {
  function formatDate() {
    return format(date, "dd 'de' MMMM", {
      locale: pt,
    });
  }

  function onPressLeft() {
    onChangeDate(subDays(date, 1));
  }

  function onPressRight() {
    onChangeDate(addDays(date, 1));
  }

  return (
    <Container>
      <ChevronButton direction="left" onPress={onPressLeft} />
      <DateText>{formatDate()}</DateText>
      <ChevronButton direction="right" onPress={onPressRight} />
    </Container>
  );
}

DatePage.propTypes = {
  onChangeDate: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};
