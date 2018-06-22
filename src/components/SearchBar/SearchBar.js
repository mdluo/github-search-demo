import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';

@withRouter
class SearchBar extends PureComponent {
  render() {
    const { history, value } = this.props;
    return (
      <Input.Search
        size="large"
        placeholder="Input username keywords to search"
        defaultValue={value}
        onSearch={q => {
          if (q !== value) {
            history.push(`/search?q=${q}`);
          }
        }}
        enterButton
      />
    );
  }
}

export default SearchBar;
