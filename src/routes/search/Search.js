import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';

import * as searchActions from 'modules/search';

import Page from 'layouts/Page';
import SearchBar from 'components/SearchBar';
import SearchResult from 'components/SearchResult';

@connect(({ entities, search }) => {
  const { result } = search;
  if (result) {
    return {
      ...search,
      result: {
        ...result,
        items: result.items.map((item) => entities.users[item]),
      },
    };
  }
  return {};
}, {
  ...searchActions,
})
class Search extends Component {
  state = {
    q: '',
  };

  static getDerivedStateFromProps(props, state) {
    const { q } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    if (q !== state.q) {
      props.search(q);
      return { q };
    } else {
      return null;
    }
  }

  render() {
    const { q } = this.state;
    const { loaded, result } = this.props;
    return (
      <Page backable>
        <SearchBar value={q} />
        <SearchResult data={result} loading={!loaded} />
      </Page>
    );
  }
}

export default Search;
