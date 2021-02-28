import React from "react";
import { createAsyncSelector } from 'async-selector';

export interface SelectorState {
  cancelled: boolean;
  onCancel: () => void;
}

export function useAsyncSelector<AsyncReturn, State, Props = undefined, DefaultValue = []>(params: {
  async: (status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: () => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: []): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, R3, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, val3: R3, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2, val3: R3) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2, R3]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, val3: R3, val4: R4, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2, R3, R4]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2, R3, R4, R5]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, R6, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2, R3, R4, R5, R6]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, R6, R7, Props = undefined, DefaultValue = []>(params: {
  async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, status: SelectorState) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [R1, R2, R3, R4, R5, R6, R7]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];

export function useAsyncSelector(params, deps) {
  const [x, rerender] = React.useState({});
  const [ref] = React.useState({
    activePromise: null as any,
    activeSelectorState: null as null | SelectorState,
  });

  const asyncSelector = React.useMemo(() => createAsyncSelector({
    ...params,
    onResolve: (result) => {
      params.onResolve && params.onResolve(result);
      rerender({});
    },
    onReject: error => {
      params.onReject && params.onReject(error);
      rerender({});
    },
    onCancel: (cancelledPromise) => {
      if (cancelledPromise === ref.activePromise && ref.activeSelectorState) {
        ref.activeSelectorState.cancelled = true;
        ref.activeSelectorState.onCancel();
      }
      params.onCancel && params.onCancel(cancelledPromise);
    },
    async: (...vals) => {
      const promise = new Promise((resolve, reject) => {
        const selectorState: SelectorState = {
          onCancel: () => null,
          cancelled: false,
        }
        ref.activeSelectorState = selectorState;
        params.async(...vals, selectorState)
          .then(resolve)
          .catch(reject)
      });
      ref.activePromise = promise;
      return promise;
    },
  } as any,
    deps.map((d, index) => (deps) => deps[index]),
  ), []);

  const result: any = asyncSelector(deps);
  const error = result.isRejected ? result.value : null;
  const isWaiting = result.isWaiting;
  const value = (() => {
    if (result.previous === undefined) {
      if (params.defaultValue === undefined) {
        return [];
      } else {
        return params.defaultValue;
      }
    } else {
      return result.previous;
    }
  })();

  const forceUpdate = () => {
    asyncSelector.forceUpdate(deps);
    return ref.activePromise;
  }

  return [value, isWaiting, error, forceUpdate];
}