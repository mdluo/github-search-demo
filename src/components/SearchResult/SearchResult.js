import React, { PureComponent } from 'react';

import Spinner from 'components/Spinner';
import Item from './Item';
import styles from './SearchResult.module.less';

class SearchResult extends PureComponent {
  render() {
    const { data, loading } = this.props;
    if (loading) {
      return (
        <div className={styles.loading}>
          <Spinner fontSize={36} block />
        </div>
      );
    }
    return (
      <div className={styles.result}>
        <p className={styles.count}>Total results: {data.totalCount}</p>
        <div className={styles.items}>
          {data.items.map(item => (
            <Item key={item.login} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResult;
