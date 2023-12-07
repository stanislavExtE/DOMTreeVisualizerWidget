const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // entry: "./src/ts/widget/DOMTreeWidget.ts",
  output: {
    filename: "widget.min.js",
    path: path.resolve(__dirname, "dist"),
    umdNamedDefine: true,
    libraryTarget: 'umd',
    library: 'DOMTreeWidget',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    library: {
      name: "DOMTreeWidget",
      type: "umd",  
      export: "default", 
    },
  },
  resolve: {
    extensions: [".ts", ".js",],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          { loader: "style-loader" },
          {
            loader: "css-loader",
           
          },
          {
            loader: "sass-loader",
           
          },
        ],
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|obj|fbx|mtl|gltf|glb|dae|3ds|woff|woff2|eot|ttf|svg|stl)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    // On development we want to see where the file is coming from, hence we preserve the [path]
                    name: '[path][name].[ext]?hash=[hash:20]',
                    limit: 8192
                }
            }
        ]
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      scriptLoading: "blocking",
      inject: "head",
      // minify: {
        // collapseWhitespace: true,
        // removeComments: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // useShortDoctype: true,
      // },
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", 
    }),
    
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin({
  //     terserOptions: {
  //       keep_classnames: true, // Preserve class names
  //       keep_fnames: true, // Preserve function names
  //     },
  //   })],
  // },
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 8080,
  //   watchContentBase: true,
  // },
};
