import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { merge } from 'webpack-merge';

import { cssRule, tsRule } from './rules';

const rootPath = path.join(__dirname, '..');
const staticPath = path.join(rootPath, 'static');
const paths = {
  dist: path.join(rootPath, '..', 'dist'),
  htmlTemplate: path.join(staticPath, 'index.html'),
  favicon: path.join(staticPath, 'img', 'favicon.svg'),
};

const commonConfig = merge(
  {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      publicPath: '/',
      path: paths.dist,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.htmlTemplate,
        favicon: paths.favicon,
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(staticPath, 'css'),
            to: paths.dist,
          },
        ],
      }),
    ],
  },
  cssRule(),
  tsRule(),
);

module.exports = commonConfig;
