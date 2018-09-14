

var webpack = require('webpack')
var path = require('path');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname,'js/app/index.js'),
    output: {
        path: path.join(__dirname, '../public/js'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader' // translates CSS into CommonJS
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            }
        ],
    },
    resolve: {//配置模块
        alias: {
            jquery:path.join(__dirname,"js/lib/jquery.min.js"),
            mod:path.join(__dirname,"js/mod"),
            less:path.join(__dirname,"less")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery"
        })//加入的插件相当于在每个使用jquery的模块中使用了var $ = require('jquery')
    ]
};