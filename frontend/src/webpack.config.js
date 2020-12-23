const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, '../dst');
const APP_DIR = path.resolve(__dirname, './');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const scriptName = isProduction ? 'bundle.min.js' : 'bundle.js';

    return {
        entry: './index.tsx',
        output: {
            path: BUILD_DIR,
            filename: scriptName,
        },
        performance: {
            hints: isProduction ? 'warning' : false,
        },
        target: isProduction ? 'browserslist' : 'web',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts?$/,
                    use: ['eslint-loader'],
                    include: APP_DIR,
                },
                {
                    test: /\.(jpg|png)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]',
                            esModule: false,
                        },
                    }],
                },
                {
                    test: /\.(scss|css)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            modules: [
                path.resolve(__dirname),
                path.resolve(__dirname, 'node_modules'),
            ],
            extensions: ['.ts', '.tsx', '.js'],
        },
        devServer: {
            historyApiFallback: true,
            disableHostCheck: true,
            hot: true,
            contentBase: '../dst/',
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                scriptPath: `/${scriptName}?v${PACKAGE.version}`,
                inject: false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './static', to: '../dst/static' },
                ],
            }),
        ],
    };
};
