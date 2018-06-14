const { injectBabelPlugin, getLoader, loaderNameMatches, compose } = require('react-app-rewired');
const paths = require('react-app-rewired/scripts/utils/paths');
const rewireLess = require('react-app-rewire-less-modules');
const rewireVendorSplitting = require('react-app-rewire-vendor-splitting');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const theme = require('./src/theme.js');

const cssModuleRegex = /\.module\.css$/;

/* eslint no-param-reassign: [0] */
module.exports = function override(config, env) {
  config = injectBabelPlugin([
    'import', { libraryName: 'antd', style: true, libraryDirectory: 'es' },
  ], config);

  if (env !== 'test') {
    config = injectBabelPlugin([
      'module-resolver', { root: ['./src'] },
    ], config);
  }

  if (env === 'production') {
    config.entry = { main: paths.appIndexJs };

    // Change css module class names in production
    // require react-scripts >= 2.0.0-next.b2fd8db8
    const cssModuleMatcher = (rule) => {
      return String(rule.test) === String(cssModuleRegex);
    };
    const cssModuleRule = getLoader(config.module.rules, cssModuleMatcher);
    const cssLoader = cssModuleRule.loader.find(loader => loaderNameMatches(loader, 'css-loader'));
    cssLoader.options.localIdentName = 'hn-[hash:base64:8]';

    // Include bundle analyzation
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    );
  }

  config = compose(
    rewireLess.withLoaderOptions({
      modifyVars: theme,
      javascriptEnabled: true,
    }),
    rewireVendorSplitting,
  )(config, env);

  return config;
};
