import React, { PureComponent } from 'react';
import { Button } from 'antd';

import Spinner from 'components/Spinner';
import UserItem from './UserItem';
import styles from './SearchResult.module.less';

class SearchResult extends PureComponent {
  loadMore = () => {
    const { query, searchCall } = this.props;
    searchCall(query, true);
  }

  renderSpinner = () => {
    const { isFetching, nextPageUrl } = this.props;
    if (isFetching) {
      return (
        <div className={styles.loading}>
          <Spinner fontSize={36} block />
        </div>
      );
    }
    if (nextPageUrl) {
      return (
        <Button
          type="dashed"
          className={styles.loadMore}
          onClick={this.loadMore}
        >
          Load more
        </Button>
      );
    }
    return null;
  }

  render() {
    const { items, totalCount } = this.props;
    return (
      <div className={styles.result}>
        <p className={styles.count}>Total results: {totalCount}</p>
        <div className={styles.items}>
          {items.map(item => (
            <UserItem key={item.login} {...item} />
          ))}
          {this.renderSpinner()}
        </div>
      </div>
    );
  }
}

SearchResult.defaultProps = {
  items: [],
};

export default SearchResult;
