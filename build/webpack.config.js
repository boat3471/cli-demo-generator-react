/* eslint-env node */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//css分离打包
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
const entry = require('./.entry');
const htmlList = require('./core/generatorHtml');

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        path: path.join(__dirname, '../', 'dist', 'static'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../', 'src')
                ],
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true
                }
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            {'plugins': ['@babel/plugin-proposal-class-properties']}
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {url: false, sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                options: {
                    publicPath: '/'
                }
            }

        ]
    },
    devServer: {
        port: 3100,
        open: true
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, '../', 'src/'),
            component: path.resolve(__dirname, '../', 'src/components/'),
            '-style': path.resolve(__dirname, '../', 'src/styles/')
        }
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        ...htmlList,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'common',
                    priority: 10
                }
            }
        }
    }
};
