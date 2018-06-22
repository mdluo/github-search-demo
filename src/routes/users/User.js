import React, { Component, Fragment } from 'react';
import { Row, Col, Avatar, Icon, Divider, Button, notification } from 'antd';
import { connect } from 'react-redux';

import * as errorActions from 'modules/error';
import * as userActions from 'modules/user';

import Page from 'layouts/Page';
import Spinner from 'components/Spinner';

import styles from './User.module.less';

@connect(({ entities, pagination, errorMessage }, ownProps) => {
  const { login } = ownProps.match.params;
  const result = pagination.repos[login];
  if (result) {
    return {
      user: entities.users[login],
      repos: {
        ...result,
        items: result.ids.map((id) => entities.repos[id]),
      },
      errorMessage,
    };
  }
  return { errorMessage };
}, {
  ...errorActions,
  ...userActions,
})
class User extends Component {
  state = {}

  static getDerivedStateFromProps(props) {
    if (props.errorMessage) {
      notification.error({
        message: props.errorMessage,
        duration: null,
        onClose: () => {
          props.resetErrorMessage();
        },
      });
    }
    return null;
  }
  componentDidMount() {
    const { login } = this.props.match.params;
    this.props.getUserCall(login);
    this.props.getUserCall(login, ['name']);
    this.props.getUserReposCall(login);
  }

  loadMore = () => {
    const { login } = this.props.match.params;
    const { getUserReposCall } = this.props;
    getUserReposCall(login, true);
  }

  renderSpinner = () => {
    const { isFetching, nextPageUrl } = this.props.repos;
    if (isFetching) {
      return (
        <Spinner fontSize={36} block />
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
    const { user, repos } = this.props;
    return (
      <Page backable backUrl={null}>
        {user ? (
          <Row className={styles.content} gutter={24}>
            <Col xs={30} sm={6}>
              <Avatar className={styles.avatar} shape="square" src={user.avatarUrl} />
              <h2 className={styles.name}>{user.name}</h2>
              <p>@{user.login}</p>
              <p className={styles.bio}>{user.bio}</p>
              <div className={styles.info}>
                {user.company && (<p><Icon type="idcard" />{user.company}</p>)}
                {user.location && (<p><Icon type="environment-o" />{user.location}</p>)}
                {user.blog && (<p><Icon type="link" /><a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a></p>)}
              </div>
            </Col>
            <Col sm={18} xs={24}>
              {repos.items.map((repo) => (
                <Fragment key={repo.fullName}>
                  <h3>
                    <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  </h3>
                  <p>{repo.description}</p>
                  <Divider />
                </Fragment>
              ))}
              {this.renderSpinner()}
            </Col>
          </Row>
        ) : (
          <Spinner fontSize={36} block />
        )}
      </Page>
    );
  }
}

export default User;
