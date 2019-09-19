import * as React from "react";
import { TypedUseSelectorHook } from "react-redux";
import { Store } from "redux";
import PropTypes from "prop-types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Provider, createSelectorHook }: any = require("react-redux");

export interface ReduxHooksInterface<S> {
  useSelector: TypedUseSelectorHook<S>;
  Provider: React.FunctionComponent;
  getState(): S;
}

export function createReduxHooks<S>(store: Store<S>): ReduxHooksInterface<S> {
  const Context = React.createContext(null);
  const useSelector = createSelectorHook(Context);

  const NewProvider: React.FunctionComponent = ({ children }) => {
    return (
      <Provider context={Context} store={store}>
        {children}
      </Provider>
    );
  };
  NewProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

  return {
    useSelector,
    Provider: NewProvider,
    getState: () => {
      return store.getState();
    }
  };
}
