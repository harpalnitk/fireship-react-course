import React from 'react';
import BackwardCounter from '../components/Counter/BackwardCounter';
import ForwardCounter from '../components/Counter/ForwardCounter';

function CounterApp() {
  return (
    <React.Fragment>
      <ForwardCounter />
      <BackwardCounter />
    </React.Fragment>
  );
}

export default CounterApp;