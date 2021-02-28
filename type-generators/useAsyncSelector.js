var list = n => {
  const L = []
  for (let i = 1; i <= n; i++) {
    L.push(i)
  }
  return L
}

// prettier-ignore
function makeType(n) {
  return `
export function useAsyncSelector<AsyncReturn, State, ${list(n).map(n => `R${n}`)}${n == 0 ? '' : ', '}Props = undefined, DefaultValue = []>(params: {
  async: (${list(n).map(n => `val${n}: R${n}`).concat(['status: SelectorState']).join(', ')}) => Promise<AsyncReturn>;
  onResolve?: (result: AsyncReturn) => void;
  onReject?: (error: any) => void;
  onCancel?: (promise: Promise<AsyncReturn>) => void;
  shouldUseAsync?: (${list(n).map(n => `val${n}: R${n}`).join(', ')}) => boolean;
  throttle?: (f: Function) => Function;
  defaultValue?: DefaultValue,
}, deps: [${list(n).map(n => `R${n}`).join(', ')}]): [
    AsyncReturn | DefaultValue,
    boolean,
    any,
    () => Promise<AsyncReturn>
  ];
`
}

var L = []
for (let i = 0; i < 8; i++) {
  L.push(makeType(i))
}
L.join('')
