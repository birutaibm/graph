import React from 'react';

import Graph from './components/Graph';

import './App.css';
import Item from './components/Serie/Item';
import Categorical from './components/Axis/Categorical';
import Axis from './components/Axis';
import LinearRange from './components/Axis/LinearRange';
import Serie from './components/Serie';

function App() {
  return (
    <Graph width={400} height={300}>
      <Axis>
        <Categorical
          name='xAxis'
          categories={['v1','v2','v3','v4']}
        />
        <LinearRange name='yAxis' max={300}/>
      </Axis>
      <Serie name='teste' type='AcumulatedBar' xAxis='xAxis' yAxis='yAxis'>
        <Item x='v1' y={50} />
        <Item x='v2' y={25} />
        <Item x='v3' y={50} />
        <Item x='v4' y={75} />
      </Serie>
    </Graph>
  );
}

export default App;
