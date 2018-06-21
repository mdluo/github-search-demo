import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import paginate from './paginate';
import searchModule, * as searchActions from './search';
import userModule, * as userActions from './user';

const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};


const pagination = combineReducers({
  search: paginate({
    mapActionToKey: action => action.login,
    types: [
      searchActions.REQUEST,
      searchActions.SUCCESS,
      searchActions.FAILURE,
    ],
  }),
});

export default combineReducers({
  entities,
  // pagination,
  search: searchModule,
  user: userModule,
});
