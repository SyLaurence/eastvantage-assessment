const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "/src/app.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "./"
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: "babel-loader" },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.(png|jp(e*)g|svg|gif)$/, type: "asset/resource" }
        ]
    },
    resolve: {
        extensions: [".jsx", "..."]
    },
    mode: process.env.NODE_ENV === 'production' 
    ? 'production' 
    : 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}