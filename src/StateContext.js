import React from 'react';

const StateContext = React.createContext({
  state: {},  
  setState: () => {}  
});

export default StateContext;
