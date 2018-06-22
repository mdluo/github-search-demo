import qs from 'qs';

import { CALL_API, Schemas } from 'middleware/api';
import { PAGE_SIZE } from 'constants';

export const REQUEST = 'search/REQUEST';
export const SUCCESS = 'search/SUCCESS';
export const FAILURE = 'search/FAILURE';

// actions

const searchApi = (query, nextPageUrl) => ({
  query,
  [CALL_API]: {
    types: [REQUEST, SUCCESS, FAILURE],
    endpoint: nextPageUrl || `/search/users?${qs.stringify({
      q: `${query} in:login`,
      type: 'Users',
      per_page: PAGE_SIZE,
    })}`,
    schema: Schemas.USER_SEARCH,
  },
});

export const searchCall = (query, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl,
    pageCount = 0,
  } = getState().pagination.search[query] || {};
  if (pageCount > 0 && !nextPage) {
    return null;
  }
  return dispatch(searchApi(query, nextPageUrl));
};
