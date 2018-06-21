import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Card, Icon } from 'antd';

import Link from '../Link';
import Footer from '../Footer';
import styles from './Page.module.less';

const { Content } = Layout;

class Page extends Component {
  back = () => {
    this.props.history.go(-1);
  }

  render() {
    const { title, hideTitle, backable, middle, maxWidth, bodyStyle, children, loading } = this.props;
    return (
      <Layout className={styles.layout}>
        <Content
          className={styles.content}
          style={{ justifyContent: middle ? 'center' : 'start' }}
        >
          <Card
            className={styles.card}
            style={{ maxWidth, marginTop: middle ? -20 : 30 }}
            bodyStyle={bodyStyle}
            bordered={false}
            title={!hideTitle && (
              backable ? (
                <span><a><Icon type="arrow-left" onClick={this.back} /></a> {title}</span>
              ) : title
            )}
            extra={!hideTitle && (
              <Link href="https://github.com/mdluo/pb-demo"><Icon type="link" /> GitHub</Link>
            )}
            loading={loading}
          >
            {children}
          </Card>
        </Content>
        <Footer />
      </Layout>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  backable: PropTypes.bool,
  middle: PropTypes.bool,
  maxWidth: PropTypes.number,
  bodyStyle: PropTypes.object,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {
  title: 'GitHub Search Demo',
  hideTitle: false,
  backable: false,
  maxWidth: 1000,
  middle: false,
  bodyStyle: { padding: 24 },
  loading: false,
};

export default withRouter(Page);
