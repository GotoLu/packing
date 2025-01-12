/**
 * webpack.serve.loader 配置文件
 * @author Joe Zhong <zhong.zhi@163.com>
 * @module config/webpack.serve.loader
 */

import fs from 'fs';
import path from 'path';
import { pRequire, getContext } from '..';
import getExistConfigPath from '../lib/get-exist-config-path';

const context = getContext();

const babelOptions = {};
if (context && fs.existsSync(path.resolve(context, 'babel.config.js'))) {
  babelOptions.cwd = context;
}

const {
  assetExtensions,
  babelLoader: babelLoaderOptions,
  cssLoader: cssLoaderOptions,
  eslint: {
    enabled: eslintEnabled,
    options: eslintOptions
  }
} = pRequire('config/packing');

const postcssLoaderOptions = {
  config: {
    path: getExistConfigPath('postcss', context, __dirname)
  }
};

const jsLoaders = [
  {
    loader: 'babel-loader',
    options: Object.assign(babelOptions, babelLoaderOptions)
  }
];

if (eslintEnabled) {
  jsLoaders.push({
    loader: 'eslint-loader',
    options: eslintOptions
  });
}

export default {
  rules: [
    {
      test: /\.js$/i,
      exclude: /node_modules/,
      use: jsLoaders
    },
    {
      test: /\.css$/i,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: cssLoaderOptions },
        { loader: 'postcss-loader', options: postcssLoaderOptions }
      ]
    },
    {
      test: /\.(scss|sass)$/i,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: cssLoaderOptions },
        { loader: 'postcss-loader', options: postcssLoaderOptions },
        { loader: 'sass-loader' }
      ]
    },
    {
      test: /\.less$/i,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: cssLoaderOptions },
        { loader: 'postcss-loader', options: postcssLoaderOptions },
        { loader: 'less-loader' }
      ]
    },
    {
      test: new RegExp(`.(${assetExtensions.join('|')})$`, 'i'),
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        publicPath: '/'
      }
    }
  ]
};
