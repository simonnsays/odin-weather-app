import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (env, arg) => {
    const isProd = arg.mode === 'production'

    return {
        mode: arg.mode || 'development',
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(import.meta.dirname, 'dist'),
            clean: true,
        },
        devtool: isProd ? false : 'eval-source-map',
        devServer: {
            watchFiles: ['./src/template.html'],
            open: true,
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/template.html',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.html$/i,
                    use: ['html-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    }
}
