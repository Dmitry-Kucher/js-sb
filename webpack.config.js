const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const gyronorm = path.join(__dirname, '/node_modules/gyronorm/dist/gyronorm.complete.min.js');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            '@babel/polyfill',
            path.resolve(__dirname, 'src/index.js')
        ],
        vendor: ['pixi', 'p2', 'phaser', 'gyronorm'] //do not change the order it causes the following error: "PIXI.Point is not a constructor"
    },
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'js/[name].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'static'),
        publicPath: '/',
        port: 9005,
    },
    plugins: [new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'src/index.html')
    })],
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: /pixi\.js$/,
                use: ['expose-loader?PIXI']
            },
            {
                test: /p2\.js$/,
                use: ['expose-loader?p2']
            },
            {
                test: /gyronorm\.complete\.min\.js$/,
                use: ['expose-loader?GyroNorm']
            },
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
            'gyronorm': gyronorm,
        }
    }
};
