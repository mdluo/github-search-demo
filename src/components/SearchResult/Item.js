import React, { PureComponent } from 'react';
import { Card, Avatar } from 'antd';

import LoadingBlock from 'components/LoadingBlock';
import styles from './SearchResult.module.less';

class Item extends PureComponent {
  render() {
    const { avatarUrl, name, login, bio, publicRepos, followers } = this.props;
    return (
      <Card hoverable className={styles.item}>
        <Card.Meta
          avatar={<Avatar src={avatarUrl} />}
          title={
            <span>
              {name || <LoadingBlock width={4} />} <small>@{login}</small>
            </span>
          }
          description={bio || <LoadingBlock width={30} />}
        />
        <div className={styles.extra}>
          <small>{publicRepos || <LoadingBlock width={3} />} repositories</small>
          <small>{followers || <LoadingBlock width={3} />} followers</small>
        </div>
      </Card>
    );
  }
}

export default Item;
