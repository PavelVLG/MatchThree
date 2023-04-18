const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const timestamp = Date.now();

const production = {
    mode: 'production',
    stats: 'errors-warnings',
    output: {
        filename: `[name].[contenthash].${timestamp}.bundle.js`,
        chunkFilename: `[name].[contenthash].${timestamp}.chunk.js`,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: `[name].[contenthash].${timestamp}.bundle.js`,
                },
            },
        },
    },
};

module.exports = merge(common, production);
