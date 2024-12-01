const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.production' });

module.exports = {
    mode: 'production',
    entry: './app.js',
    target: 'node',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(css|eot|svg|woff|woff2|ttf)$/,
                use: ['file-loader'],
            },
        ],
    },
};
