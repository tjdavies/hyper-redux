

## hyper-redux

Create React App is divided into two packages:

* install

```sh
  npm install hyper-redux
```

```js
import * as React from 'react';
import { app,  ReducerFn } from 'hyper-redux';

const initalState: 0;

const actionsMap = {
  increment: delta => state => state + delta,
  decrement: delta => state => state - delta,
  incrementDelayed: delta => (state, actions) => {
    setTimeout(actions.increment, 1000, delta);
    return state;
  }
};

function view(state: State, actions: Actions ) {
  return (
    <div>
      <p> Clicked: {state} times </p>
      <button onClick={() => actions.increment(1)}>+</button>
      <button onClick={() => actions.decrement(1)}>-</button>
      <button onClick={() => actions.incrementDelayed(1)}>+ delayed</button>
    </div>
  );
}

app(initalState, actionsMap, view, document.getElementById('root') as HTMLElement);
```