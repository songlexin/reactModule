const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const webpack = require('webpack');
const config = {
    mode: 'development',
    entry:{
        app: path.join(__dirname,'../client/app.js')
    },
    output:{
        filename:'[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: '/public/',
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader',
                query: {compact: false}
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname,"../client/template.html")
        })
    ]
}

if(isDev){
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname,'../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname,'../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config