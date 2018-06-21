import qs from 'qs';

import { CALL_API, Schemas } from 'middleware/api';
import { PAGE_SIZE } from 'constants';

export const REQUEST = 'search/REQUEST';
export const SUCCESS = 'search/SUCCESS';
export const FAILURE = 'search/FAILURE';

// actions

export const search = (query) => ({
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint: `/search/users?${qs.stringify({
      q: query,
      per_page: PAGE_SIZE,
    })}`,
    schema: Schemas.USER_SEARCH,
  },
});

// reducer

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        ...action.response,
      };
    case FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        ...action.response,
      };
    default:
      return state;
  }
};
