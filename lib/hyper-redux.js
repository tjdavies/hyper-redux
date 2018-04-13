var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
function createReducer(initialState, handlers, actions) {
    return function reducer(state, action) {
        if (state === void 0) { state = initialState; }
        if (handlers[action.type] !== undefined) {
            return handlers[action.type].apply(handlers, action.payload)(state, actions);
        }
        else {
            return state;
        }
    };
}
function createActions(actions, point) {
    return Object.keys(actions).reduce(function (accumulator, currentkey) {
        accumulator[currentkey] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return point.dispatch({
                type: currentkey,
                payload: args
            });
        };
        return accumulator;
    }, {});
}
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { value: _this.props.store.getState() };
        return _this;
    }
    Wrapper.prototype.componentDidMount = function () {
        var _this = this;
        this.props.store.subscribe(function () {
            return _this.setState({ value: _this.props.store.getState() });
        });
    };
    Wrapper.prototype.render = function () {
        return this.props.view(this.state.value, this.props.actions);
    };
    return Wrapper;
}(React.Component));
export function app(initialState, reducer, view, container) {
    var point = { dispatch: null };
    var actions = createActions(reducer, point);
    var reducers = createReducer(initialState, reducer, actions);
    var store = createStore(reducers, initialState, window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']());
    point.dispatch = store.dispatch;
    return render(React.createElement(Wrapper, { store: store, actions: actions, view: view }), document.getElementById('root'));
}
