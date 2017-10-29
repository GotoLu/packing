#!/usr/bin/env node

import { red, yellow } from 'chalk';
import webpack from 'webpack';
import '../util/babel-register';
import pRequire from '../util/require';

const appConfig = pRequire('config/packing');
const webpackConfig = pRequire('config/webpack.build.babel', {}, appConfig);

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err);
  } else if (stats.hasErrors()) {
    console.log(red('❌ ERROR in ', stats.compilation.errors));
    console.log(red('💔  webpack: bundle is now INVALID.'));
    process.exit(1);
  } else if (stats.hasWarnings()) {
    console.log(yellow('⚠️  webpack: ', stats.compilation.warnings));
  } else {
    console.log(stats.toString(stats));
    console.log('💚  webpack: bundle is now VALID.');
  }
});
