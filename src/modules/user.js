import { CALL_API, Schemas } from 'middleware/api';
import { PAGE_SIZE } from 'constants';

export const REQUEST = 'user/REQUEST';
export const SUCCESS = 'user/SUCCESS';
export const FAILURE = 'user/FAILURE';

export const REPO_REQUEST = 'user/REPO_REQUEST';
export const REPO_SUCCESS = 'user/REPO_SUCCESS';
export const REPO_FAILURE = 'user/REPO_FAILURE';

// actions

const getUserApi = (login) => ({
  login,
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint: `/users/${login}`,
    schema: Schemas.USER,
  },
});

const getUserReposApi = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
    endpoint: nextPageUrl || `/users/${login}/repos?per_page=${PAGE_SIZE}`,
    schema: Schemas.REPO_ARRAY,
  },
});

export const getUserCall = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login];
  if (user && requiredFields.every(key => Object.hasOwnProperty.call(user, key))) {
    return null;
  }
  return dispatch(getUserApi(login));
};

export const getUserReposCall = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl,
    pageCount = 0,
  } = getState().pagination.repos[login] || {};
  if (pageCount > 0 && !nextPage) {
    return null;
  }
  return dispatch(getUserReposApi(login, nextPageUrl));
};
