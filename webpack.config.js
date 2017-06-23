var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var eslintrcPath = path.resolve(__dirname, '.eslintrc');

module.exports = {
    devtool: 'eval',
    entry: {
        app:[
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            './src/app.js'
        ],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    module: {
        exprContextRegExp: /$^/,
        exprContextCritical: false,
        noParse: /node_modules\/(autoit|moment|echarts\.js)/,
        rules: [
            {
                test: /\.js(x)?$/,
                enforce: 'pre',
                exclude: nodeModulesPath,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: eslintrcPath
                        }
                    }
                ]
            },
            {
                test: /\.js(x)?$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.(less)$/,
                use: ['style-loader', 'css-loader?importLoaders=1', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            {
                test : /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.css', '.scss', '.less']
    }
};
