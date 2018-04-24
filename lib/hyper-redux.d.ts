/// <reference types="react" />
import * as React from 'react';
export declare type ReducerFn<T, U> = (state: T, actions: U) => T;
export declare type Actions<T> = {
    [P in keyof T]: T[P];
};
export declare type View<T, U> = (state: T, actions: U) => JSX.Element;
export declare const AppConsumer: React.ComponentType<React.ConsumerProps<{} | undefined>>;
export declare function app<T, U>(initialState: T, reducer: U, view: View<T, U>, container: HTMLElement): any;
