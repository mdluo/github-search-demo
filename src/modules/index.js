import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import paginate from './paginate';
import * as errorActions from './error';
import * as searchActions from './search';
import * as userActions from './user';

const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};

const pagination = combineReducers({
  search: paginate({
    mapActionToKey: action => action.query,
    mapActionToIds: action => action.response.result.items,
    mapExtra: action => ({ totalCount: action.response.result.totalCount }),
    types: [
      searchActions.REQUEST,
      searchActions.SUCCESS,
      searchActions.FAILURE,
    ],
  }),
  repos: paginate({
    mapActionToKey: action => action.login,
    mapActionToIds: action => action.response.result,
    mapExtra: () => ({}),
    types: [
      userActions.REPO_REQUEST,
      userActions.REPO_SUCCESS,
      userActions.REPO_FAILURE,
    ],
  }),
});

// Updates error message to notify about the failed fetches.
export const errorMessage = (state = null, action) => {
  const { type, error } = action;
  if (type === errorActions.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }
  return state;
};

export default combineReducers({
  entities,
  pagination,
  errorMessage,
});
