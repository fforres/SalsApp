import { AsyncStorage } from 'react-native'
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import rootReducer from './modules';
import { persistStore, autoRehydrate } from 'redux-persist'
import { Actions } from 'react-native-router-flux'

const persistConfig = {
  storage: AsyncStorage,
  skipRestore: false,
}
export default function configureStore (initialState, __DEBUG__) {
  let enhancer;
  const middleware = applyMiddleware(thunk);
  if(__DEBUG__){
    enhancer = compose(middleware, autoRehydrate(), devTools());
  } else {
    enhancer = compose(middleware, autoRehydrate());
  }
  const store = createStore(
    rootReducer,
    {},
    enhancer
  );
  persistStore(store, persistConfig,  () => {
    console.log('ReHydrating')
    console.log(store.getState().account);
    setTimeout(function () {
      if (store.getState().account.loggedIn) {
        Actions.home();
      } else {
        Actions.login();
      }
    }, 100);
  })
  return store;
}
