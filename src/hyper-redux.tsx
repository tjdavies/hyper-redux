import * as React from 'react';
import { createStore, Store, AnyAction, Dispatch } from 'redux';
import { render } from 'react-dom';
export type ReducerFn<T, U> =  (state: T, actions: U) => T;

function createReducer<T, U>( initialState: T, handlers:  Actions<U>, actions: U ) {
    return function reducer( state: T = initialState, action: AnyAction) {
      if (handlers[action.type] !== undefined) {
        return handlers[action.type](...action.payload)(state, actions);
      } else {
        return state;
      }
    };
  }

export type Actions<T> = { [P in keyof T]: T[P] };

const appContext = React.createContext();

export function makeContextConsumer<T, U>(): React.Consumer<{ state: T, actions: U }>  {
  return appContext.Consumer;
}

function createActions<T>(actions: T, point: any): Actions<T> {
  return Object.keys(actions).reduce((accumulator, currentkey) => {
    accumulator[currentkey] = (...args: any[]) =>
    point.dispatch({
        type: currentkey,
        payload: args
      });
    return accumulator;
  },                                 {}) as { [P in keyof T]: T[P] };
}

export type View<T, U> = (state: T, actions: U) => JSX.Element;

class Wrapper<T, U> extends React.Component<
  {store: Store<T>,
  view: View<T, U>,
  actions: U
}
, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: this.props.store.getState()};
  }

  componentDidMount() {
    this.props.store.subscribe(() =>
      this.setState({ value: this.props.store.getState() })
    );
  }
  
  render() {
    return (
    <appContext.Provider value={{state: this.state.value, actions: this.props.actions}}  >
      {this.props.view(this.state.value, this.props.actions)}
    </appContext.Provider >);
  }
}

export function app<T, U >(
  initialState: T, 
  reducer: U, 
  view: View<T, U>, 
  container: HTMLElement): any {
  var point: {dispatch: Dispatch<T> | null} =  {dispatch: null};
  const actions = createActions(reducer, point);
  const reducers = createReducer(initialState, reducer, actions);
  const store = createStore<T>(
    reducers,
    initialState,
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']() 
  );
  point.dispatch = store.dispatch;
  React.createContext( {state: initialState, actions: actions} );
  return render(
    <Wrapper store={store} actions={actions} view={view} />,
    document.getElementById('root')
  );
}
