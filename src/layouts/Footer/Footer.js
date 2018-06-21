import React from 'react';
import { Icon, Layout } from 'antd';

import Link from '../Link';

const styles = {
  heart: {
    margin: '0 0.1em',
    fontSize: '0.8em',
  },
};

const Footer = () => (
  <Layout.Footer>
    <p>Powered by <Link href="https://github.com/facebook/create-react-app">CRA</Link>, <Link href="https://ant.design/">Antd</Link> and more.</p>
    <p>Made with <Icon style={styles.heart} type="heart" /> by <Link href="https://github.com/mdluo">mdluo</Link>.</p>
  </Layout.Footer>
);

export default Footer;
