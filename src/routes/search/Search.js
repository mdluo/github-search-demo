import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';

import * as searchActions from 'modules/search';

import Page from 'layouts/Page';
import SearchBar from 'components/SearchBar';
import SearchResult from 'components/SearchResult';

@connect(({ entities, pagination }, ownProps) => {
  const { q: query } = qs.parse(ownProps.location.search, { ignoreQueryPrefix: true });
  const result = pagination.search[query];
  if (result) {
    return {
      ...result,
      items: result.ids.map((login) => entities.users[login]),
    };
  }
  return {};
}, {
  ...searchActions,
})
class Search extends Component {
  state = {
    query: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { q: query } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    if (query !== state.query) {
      props.searchCall(query);
      return { query };
    } else {
      return null;
    }
  }

  render() {
    const { query } = this.state;
    return (
      <Page backable>
        <SearchBar value={query} />
        <SearchResult {...this.props} query={query} />
      </Page>
    );
  }
}

export default Search;
