var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target:'electron',
    //context:'./',
    entry: "./src/main.ts",
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'eval-source-map',
    plugins: [

    //     new HtmlWebpackPlugin({
    //     title: 'My bbbbb',
    //     template: 'index.html'
    // }),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev') // default value if not specified
            }
        })

    ],

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    module: {
        noParse: ['ws'],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader','angular2-template-loader']
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: path.resolve(__dirname, 'index.html')

            },
        ]
    },
    externals: ['ws']

};
