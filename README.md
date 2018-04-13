## hyper-redux

HyperApp style redux (if you must use react and redux and not HyperApp)

- Fully supports redux debugger with time travel ect
- Can be strongly styped with type script

## Install

```sh
  npm install hyper-redux
```
## Example

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

app(initalState, actionsMap, view, document.getElementById('root'));
```

## Live Demo

https://codesandbox.io/s/745pqpnoz6