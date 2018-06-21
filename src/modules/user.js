import { CALL_API, Schemas } from 'middleware/api';

export const REQUEST = 'user/REQUEST';
export const SUCCESS = 'user/SUCCESS';
export const FAILURE = 'user/FAILURE';

// actions

export const get = (login) => ({
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint: `/search/users/${login}`,
    schema: Schemas.USER,
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
