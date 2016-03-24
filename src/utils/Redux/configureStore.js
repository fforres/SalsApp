import { AsyncStorage } from 'react-native'
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from './modules';
import { persistStore, autoRehydrate } from 'redux-persist'

const persistConfig = {
  storage: AsyncStorage,
}
export default function configureStore (initialState, __DEBUG__) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);
  if(__DEBUG__){
    createStoreWithMiddleware = compose(autoRehydrate(), middleware, devTools());
  } else {
    createStoreWithMiddleware = compose(autoRehydrate(), middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  persistStore(store, persistConfig)

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
