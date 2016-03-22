import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from './modules';

export default function configureStore (initialState, __DEBUG__) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);
  if(__DEBUG__){
    createStoreWithMiddleware = compose(middleware, devTools());
  } else {
    createStoreWithMiddleware = compose(middleware);
  }
  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
