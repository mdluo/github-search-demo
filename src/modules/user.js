import { CALL_API, Schemas } from 'middleware/api';

export const REQUEST = 'user/REQUEST';
export const SUCCESS = 'user/SUCCESS';
export const FAILURE = 'user/FAILURE';

// actions

const getUserApi = (login) => ({
  login,
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint: `/users/${login}`,
    schema: Schemas.USER,
  },
});

export const getUserCall = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login];
  if (user && requiredFields.every(key => Object.hasOwnProperty.call(user, key))) {
    return null;
  }
  return dispatch(getUserApi(login));
};
