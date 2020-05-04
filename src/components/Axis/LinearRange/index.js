import React from 'react';

// import { Container } from './styles';
import Redux from '../../Graph/Redux';

export default function LinearRange({name, min=0, max}) {
  const range = max - min;
  const factor = 100 / range;
  function getValue(reference) {
    const relative = reference - min;
    return factor * relative;
  }

  Redux.dispatch({
    type: 'Axis',
    name,
    axis: {
      getValue,
      index: v => v,
    },
  });

  return (
    <></>
  );
}
