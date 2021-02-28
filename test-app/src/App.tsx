import React from "react";
import logo from "./logo.svg";
import { useSelector, useDispatch, connect } from "react-redux";
// import { Store, ActionState } from "async-selector-kit";
import { debounce } from "lodash";
import { Action } from "redux";
import createAsyncSelector from "async-selector";



// const [longText, loading, err, forceUpdate] = createAsyncSelectorResults(
//   {
//     id: "wow",
//     async: async (text, status) => {
//       await new Promise(res => setTimeout(res, 500));
//       const resp = await abortableFetch(status, fetch)(
//         'https://setpoint-iterator.svc.eogresources.com/env',
//         {
//           method: 'POST',
//           headers: { 'content-type': 'application/json' },
//         });
//       return "" + text + text;
//     },
//     defaultValue: ""
//   },
//   [text]
// );

// const [newSelector] = createSubscription(
//   {
//     defaultValue: "wow",
//     onSubscribe: (inputs, setter) => {
//       console.log("onSubscribe", inputs, setter);
//     },
//     onUnsubscribe: (inputs, setter) => {
//       console.log("onSubscribe", inputs, setter);
//     }
//   },
//   []
// );

// function grr<A, R>(props: { f: (a: A) => R }): (a: A, c: number) => R;

// function grr<A, B, R>(props: {
//   f: (a: A, b: B) => R;
// }): (a: A, b: B, c: number) => R;

// function grr(a: any) {
//   return a;
// }

// const r = grr({ f: (a: string) => 5 });
// r("");

// const [action2, loadingAction2, error2] = createAsyncAction(
//   {
//     id: "wowowowow",
//     async: (store, status, val) => async () => {
//       status.onCancel = () => console.log("cancelled");
//       //console.log("started", val, wow);
//       console.log("called", action);
//       await new Promise(res => setTimeout(res, 1000));
//       //console.log("ended", val, wow);
//       try {
//         const val = await forceUpdate(store.getState());
//       } catch (e) {
//         console.log({ e });
//       }


//       return true;
//     },
//   },
//   [(state: State) => state.async]
// );

// const [action, loadingAction, error] = createAsyncAction(
//   {
//     id: "wowowowow",
//     async: (store, status, val) => async action => {
//       status.onCancel = () => console.log("cancelled");
//       //console.log("started", val, wow);
//       console.log("called", action);
//       await new Promise(res => setTimeout(res, 1000));
//       //console.log("ended", val, wow);
//       const val = await forceUpdate(store.getState());
//       console.log({ val });
//       return true;
//     },
//     subscription: (action, store) => {
//       console.log("wowowowo", { action, store });
//       return false;
//     }
//   },
//   [(state: State) => state.async]
// );

// const Sub = () => {
//   //useSelector(newSelector);
//   return <div>Sub</div>;
// };

export interface PromiseStatus {
  cancelled: boolean;
  onCancel: () => void;
}

function useAsyncSelector(params, deps) {
  const [x, rerender] = React.useState({});
  const [ref] = React.useState({
    activePromise: null as any,
    activeSelectorState: null as null | PromiseStatus,
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
        const selectorState: PromiseStatus = {
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

  const forceUpdate = (state, props) => {
    asyncSelector.forceUpdate(state, props);
    return new Promise((resolve, reject) => {
      ref.activePromise.then(d => resolve(d.result)).catch(reject);
    });
  }

  return [value, isWaiting, error, forceUpdate];
}

async function func(text: string) {
  await new Promise(res => setTimeout(res, 1000));
  return text + '!';
}

export default () => {
  const [text, setText] = React.useState('');
  const [value, loading, error] = useAsyncSelector({
    async: func,
    defaultValue: '',
  }, [text])
  return (
    <div className="App">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div>{value}</div>
      <div>{`Loading: ${loading}`}</div>
    </div>
  );
};

