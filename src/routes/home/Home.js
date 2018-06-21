import React, { Component } from 'react';

import Page from 'layouts/Page';
import SearchBar from 'components/SearchBar';

class Home extends Component {
  render() {
    return (
      <Page middle maxWidth={800} bodyStyle={{ padding: '30px 24px'}}>
        <SearchBar />
      </Page>
    );
  }
}

export default Home;
