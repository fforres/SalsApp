import createReducer from '../../createReducer';

// ------------------------------------
// Constants
// ------------------------------------
const VENUE_ADD = 'VENUE_ADD';
const VENUE_SET = 'VENUE_SET';
const VENUE_CLEAR = 'VENUE_CLEAR';
const VENUE_CURRENT_SET = 'VENUE_CURRENT_SET';
const VENUE_CURRENT_UNSET = 'VENUE_CURRENT_UNSET';

// ------------------------------------
// Actions
// ------------------------------------
export const venueAdd = (data) => ({ type: VENUE_ADD, payload: data });
export const venueSet = (data) => ({ type: VENUE_SET, payload: data });
export const venueClear = () => ({ type: VENUE_CLEAR });
export const venueCurrentSet = (data) => ({ type: VENUE_CURRENT_SET, payload: data });
export const venueCurrentUnset = () => ({ type: VENUE_CURRENT_UNSET });

export const actions = {
  venueAdd,
  venueSet,
  venueClear,
  venueCurrentSet,
  venueCurrentUnset,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  venues: {},
  current: {},
};
export default createReducer(initialState, {
  [VENUE_ADD] (state, payload = null) {
    if (payload !== null) {
    }
    return state;
  },
  [VENUE_SET]  (state, payload = null) {
    if (payload !== null) {
      return {...state, venues: payload}
    }
    return state;
  },
  [VENUE_CURRENT_SET]  (state, payload = null) {
    if (payload !== null) {
      return {...state, current: {...payload}}
    }
    return state;
  },
  [VENUE_CURRENT_UNSET]  (state, payload = null) {
    if (payload !== null) {
      return {...state, current: initialState.current}
    }
    return state;
  },
  [VENUE_CLEAR] () {
    return initialState;
  },
});
