const path = require('path');

module.exports = {
    mode: "development",
    entry: "./app",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    context: __dirname,
    devtool : 'source-map',
    devServer: {
        contentBase: 'dist',
        port: 9005,
    }
};
