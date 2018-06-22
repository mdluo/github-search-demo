import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Avatar } from 'antd';

import styles from './SearchResult.module.less';

@withRouter
class Item extends PureComponent {
  click = () => {
    const { login, history } = this.props;
    history.push(`/users/${login}`);
  }

  render() {
    const { avatarUrl, login, htmlUrl } = this.props;
    return (
      <Card
        className={styles.item}
        hoverable
        onClick={this.click}
      >
        <Card.Meta
          avatar={<Avatar src={avatarUrl} shape="square" size="large" />}
          title={<span>@{login}</span>}
          description={htmlUrl}
        />
      </Card>
    );
  }
}

export default Item;
