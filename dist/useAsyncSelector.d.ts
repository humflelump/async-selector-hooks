export interface SelectorState {
    cancelled: boolean;
    onCancel: () => void;
}
export declare function useAsyncSelector<AsyncReturn, State, Props = undefined, DefaultValue = []>(params: {
    async: (status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: () => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: []): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, R3, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, val3: R3, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2, val3: R3) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2, R3]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, val3: R3, val4: R4, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2, R3, R4]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2, R3, R4, R5]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, R6, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2, R3, R4, R5, R6]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
export declare function useAsyncSelector<AsyncReturn, State, R1, R2, R3, R4, R5, R6, R7, Props = undefined, DefaultValue = []>(params: {
    async: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7, status: SelectorState) => Promise<AsyncReturn>;
    onResolve?: (result: AsyncReturn) => void;
    onReject?: (error: any) => void;
    onCancel?: (promise: Promise<AsyncReturn>) => void;
    shouldUseAsync?: (val1: R1, val2: R2, val3: R3, val4: R4, val5: R5, val6: R6, val7: R7) => boolean;
    throttle?: (f: Function) => Function;
    defaultValue?: DefaultValue;
}, deps: [R1, R2, R3, R4, R5, R6, R7]): [AsyncReturn | DefaultValue, boolean, any, () => Promise<AsyncReturn>];
