import React, { useRef, useEffect, Fragment } from 'react';

import Redux from './Redux';

import './styles.css';

export default function Graph({width, height, children}) {
  const canvas = useRef();
  useEffect(() => {
    Redux.dispatch({
      type: 'Canvas',
      canvas: {
        context: canvas.current.getContext("2d"),
        width: canvas.current.width,
        height: canvas.current.height,
      },
    });
  }, [canvas]);
  
  const canvasTransform = () => {
    const c = Redux.getState().canvas;
    if (c) {
      console.log(c);
    }
  };

  canvasTransform();
  Redux.subscribe(canvasTransform);
  Redux.subscribe(() => {
    console.log(Redux.getState());
  });
  const categorized = {};

  React.Children.forEach(children, child => {
    let type = child.type;
    if (typeof type === 'function') {
      type = type.name;
    }
    const brothers = categorized[type] || [];
    categorized[type] = [...brothers, child];
  });
  console.log(categorized);
  const sx = width / 100;
  const sy = -(height / 100);
  const tx = 0;
  const ty = -100;
  const transform = 'scale('+sx+', '+sy+') translate('+tx+', '+ty+')';

  return (
    <Fragment>
      <svg width={width} height={height}>
        <g transform={transform}>
          {categorized.Axis || []}
          {categorized.Serie || []}
        </g>
      </svg>
      <canvas id="myCanvas" width={width} height={height} ref={canvas}></canvas>
    </Fragment>
  );
}
