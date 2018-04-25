## hyper-redux

HyperApp style redux

For those who need to use react and redux but want something simple

- No more switch statments or action objects
- Fully supports redux debugger with time travel ect.
- Can be strongly typed with TypeScript
- Can use context to access state and actions in nested components

## Install

```sh
  npm install hyper-redux
```
## Example

```js
import * as React from 'react';
import { app } from 'hyper-redux';

const initalState: 0;

const actionsMap = {
  increment: delta => state => state + delta,
  decrement: delta => state => state - delta,
  incrementDelayed: delta => (state, actions) => {
    setTimeout(actions.increment, 1000, delta);
    return state;
  }
};

function view(state, actions ) {
  return (
    <div>
      <p> Clicked: {state} times </p>
      <button onClick={() => actions.increment(1)}>+</button>
      <button onClick={() => actions.decrement(1)}>-</button>
      <button onClick={() => actions.incrementDelayed(1)}>+ delayed</button>
    </div>
  );
}

app(initalState, actionsMap, view, document.body);
```

## Live Demo

[![Edit hyper-redux example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/745pqpnoz6)