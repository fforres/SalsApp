import thunk from 'redux-thunk';
import rootReducer from './modules';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

export default function configureStore (initialState, __DEBUG__) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (__DEBUG__) {
    console.log(true);
  }
  console.log(module);
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
