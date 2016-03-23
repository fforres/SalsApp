import createReducer from '../../createReducer';

// ------------------------------------
// Constants
// ------------------------------------
const VENUE_ADD = 'VENUE_ADD';
const VENUE_SET = 'VENUE_SET';
const VENUE_CLEAR = 'VENUE_CLEAR';
// ------------------------------------
// Actions
// ------------------------------------
export const venueAdd = (data) => ({ type: VENUE_ADD, payload: data });
export const venueSet = (data) => ({ type: VENUE_SET, payload: data });
export const venueClear = () => ({ type: VENUE_CLEAR });

export const actions = {
  venueAdd,
  venueSet,
  venueClear,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  venues: [],
};
export default createReducer(initialState, {
  [VENUE_ADD] (state, payload = null) {
    if (payload !== null) {
      console.log(payload);
    }
    return state;
  },
  [VENUE_SET]  (state, payload = null) {
    if (payload !== null) {
      let newVenues = [];
      Object.keys(payload).forEach(function(el){
        newVenues.push(payload[el]);
      })
      return {...state, venues: newVenues}
    }
    return state;
  },
  [VENUE_CLEAR] () {
    return initialState;
  },
});
