import React from 'react';
import { Spin, Icon } from 'antd';

const Spinner = ({ fontSize = 24, size, block }) => (
  <Spin
    style={{ display: block && 'block' }}
    indicator={<Icon type="loading" style={{ fontSize }} spin />}
    size={size}
  />
);

export default Spinner;
