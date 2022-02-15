import { merge } from 'webpack-merge';
import common from './webpack.common';

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'source-map',
});

module.exports = devConfig;
