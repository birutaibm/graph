import React from 'react';

import Redux from '../../Graph/Redux';

export default function Categorical({name, categories=[]}) {
  function getValue(category) {
    const index = categories.indexOf(category);
    if (index < 0) {
      throw new Error("Invalid category: "+category);
    } else {
      const size = 100 / categories.length;
      const begin = index * size;
      const end = (index + 1) * size;
      return [begin, end];
    }
  }

  Redux.dispatch({
    type: 'Axis',
    name,
    axis: {
      getValue,
      index: categories.indexOf,
      getSize: () => {
        const {context} = Redux.getState().canvas;
        if (context) {
          const title = measureTitle(context).height;
          const label = measureLabels(context).height;
          return {
            height: title + label,
          };
        }
      }
    },
  });

  const title = {
    style: {
      fillStyle: "#000",
      textAlign: "center",
      textBaseline: 'bottom',
      font: '24px Arial',
    },
  };
  const label = {
    style: {
      fillStyle: "#000",
      textAlign: "center",
      textBaseline: 'bottom',
      font: '12px Arial',
    },
  };
  function measureTitle(context) {
    if (!title.measure) {
      Object.keys(title.style).forEach(key => context[key] = title.style[key]);
      const measurement = context.measureText('Mg');
      const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
      title.measure = {
        height,
      };
    }
    return title.measure;
  }
  function measureLabels(context) {
    if (!label.measure) {
      Object.keys(label.style).forEach(key => context[key] = label.style[key]);
      const measurement = context.measureText('Mg');
      const height = measurement.actualBoundingBoxAscent + measurement.actualBoundingBoxDescent;
      console.log(height);
      label.measure = {
        height,
      };
    }
    return label.measure;
  }
  function drawTitle(canvas) {
    const {context, width, height} = canvas;
    Object.keys(title.style).forEach(key => context[key] = title.style[key]);
    context.fillText(name, width/2, height);
  }
  function drawLabels(canvas) {
    const {context, width, height} = canvas;
    const y = height - measureTitle(context).height;
    const x = width/(categories.length*2);
    Object.keys(label.style).forEach(key => context[key] = label.style[key]);
    categories.forEach((label, i) => context.fillText(label, (2*i+1)*x, y));
  }
  function drawLines(canvas) {
    let {context, width, height} = canvas;
    const y1 = height - measureTitle(context).height;
    const labelHeight = measureLabels(context).height;
    const y2 = y1 - labelHeight;
    const y3 = y1 - labelHeight/2;
    console.log(y1+' - '+labelHeight+' = '+y2);
    const xPart = width / categories.length;
    let x = 0;
    context.beginPath();
    context.lineWidth = 1;
    context.lineCap = "round";
    context.moveTo(0, y2);
    context.lineTo(width, y2);
    while (x <= width) {
      context.moveTo(x, y2);
      context.lineTo(x, y3);
      x += xPart;
    }
    context.stroke();
  }

  function drawCanvas() {
    const {canvas} = Redux.getState();
    if (canvas) {
      drawTitle(canvas);
      drawLabels(canvas);
      drawLines(canvas);
    }
  }
  Redux.subscribe(drawCanvas);
  return (
    <></>
  );
}
