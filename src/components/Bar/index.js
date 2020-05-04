import React, {useContext} from 'react';

// import { Container } from './styles';
import ChartContext from '../Graph/Context';

export default function Bar({x=0,y=0, height}) {
  const guide = {
    stroke: '#666',
    strokeWidth: 1,
  };
  const {width} = useContext(ChartContext);
  return (
    <>
      <line x1={x} y1={y} x2={x+0.1*width} y2={y} style={guide} />
      <rect fill='#0000ff' x={x+0.1*width} y={y} width={0.8*width} height={height} />
      <line x1={x+0.9*width} y1={y+height} x2={x+width} y2={y+height} style={guide} />
    </>
  );
}
