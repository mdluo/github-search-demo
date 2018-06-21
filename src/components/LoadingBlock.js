import React from 'react';

const LoadingBlock = ({ width }) => (
  <div
    className="ant-card-loading-block"
    style={{
      width: `${width}em`,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  />
);

export default LoadingBlock;
