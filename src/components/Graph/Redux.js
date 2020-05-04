import { createStore } from 'redux';

function graph(state={axis:{}, series:{}}, action) {
  const newState = {...state};
  switch (action.type) {
    case 'Axis':
      newState.axis[action.name] = action.axis;
      return newState;
    case 'Canvas':
      newState['canvas'] = action.canvas;
      return newState;
    default:
      return state;
  }
}

const store = createStore(graph);

export default store;