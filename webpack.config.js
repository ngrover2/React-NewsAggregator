var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

var OUTPUT_DIR = path.resolve(__dirname, 'dist')

console.log(`The webpack.config.js is being read from ${path.resolve(__dirname)}`)

module.exports = {
    entry : './index.js',
    output : {
        path : OUTPUT_DIR, // This is where webpack will put output files/bundles. Webpack dev server will point to this directory if public path is not set or is set to `/`. To serve contebt from some other directory, put that directory's path in publicPath 
        // path : path.resolve(__dirname),
        filename: 'index_bundle.js', // The name of the output file/bundle 
        publicPath: '/',
        // serve from weherever webpack had output the bundle. Stack Overflow question for publicPath : https://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
        
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
    devServer:{
        contentBase: OUTPUT_DIR,
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)?$/, use: {
                loader: 'babel-loader',
                    options: {
                        // exclude: "/(node_modules|bower_components)/",
                        customize: require.resolve(
                            'babel-preset-react-app/webpack-overrides'
                        )
                    }
                }
            },
            {
                test : /\.css$/, use:['style-loader', 'css-loader']
            }, // css loader will load only those css files which have been imported through js, not the ones in HTML link tags
            {
                test: /\.(jpe?g|gif|png|svg)$/i, use: {
                    loader: 'file-loader',
                        options: {
                            limit: 25000
                        }
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : path.resolve(__dirname, 'index.html')
        })
    ]
}
