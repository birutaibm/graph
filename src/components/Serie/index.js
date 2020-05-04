import React, { Fragment } from 'react';

// import { Container } from './styles';
import Redux from '../Graph/Redux';

export default function Serie({name, type, xAxis, yAxis, children}) {
  const guide = {
    stroke: '#666',
    strokeWidth: 1,
  };
  
  const functions = {
    AcumulatedBar: (propsArr=[]) => {
      let y0 = 0;
      return propsArr.map(({index, x, y}) => {
        const [x1, x2] = x;
        const width = x2 - x1;
        const y1 = y0;
        const y2 = y0 + y;
        y0 = y2;
        return (
          <Fragment key={index}>
            <line x1={x1} y1={y1} x2={x1+0.1*width} y2={y1} style={guide} />
            <rect fill='#0000ff' x={x1+0.1*width} y={y1} width={0.8*width} height={y} />
            <line x1={x1+0.9*width} y1={y2} x2={x2} y2={y2} style={guide} />
          </Fragment>
        );
      });
    }
  };
  const mappingFunction = functions[type] || (() => null);
  
  function getAxis() {
    const {axis} = Redux.getState();
    return {
      x: axis[xAxis],
      y: axis[yAxis],
    };
  }
  let axis = getAxis();
  Redux.subscribe(() => axis = getAxis());
  
  let props = React.Children.toArray(children);
  console.log(props);
  props = props.map(child => {
    console.log(JSON.stringify(axis));
      let type = child.type;
      if (typeof type === 'function') {
        type = type.name;
        if (type === 'Item') {
          return {
            index: axis.x.index(child.props.x),
            x: axis.x.getValue(child.props.x),
            y: axis.y.getValue(child.props.y),
          };
        }
      }
      return null;
    }).filter(item => item !== null)
    .sort((i1, i2) => i2.index - i1.index);
  const mappedItens = mappingFunction(props);

  console.log(mappedItens);

  return (
    <Fragment>
      {mappedItens}
    </Fragment>
  );
}
