import { combineReducers } from 'redux';
import account from './account';
import sidebar from './sidebar';
// import notifications from './notifications';

export default combineReducers({
  account,
  sidebar,
});
