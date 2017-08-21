const path = require('path');

let browsersList = [
  'last 4 versions',
  'Android >= 4.0',
  'Chrome >= 37',
  'iOS>=7'
];

module.exports = {
  path: "", //页面层级
  entry: ["index"], //页面文件列表 Array or Object
  commonsChunk: {
    name: null, //公共js、样式文件名，默认common
    minChunks: null, //至少几个文件出现才抽取公共
    exclude: []
  },
  sprites: { //覆写 userConfg.js 雪碧图配置
    spritesmith: {
      padding: 4
    },
    retina: true,
    ratio: 3
  },
  // external loaders for webpack
  extLoaders: [
    {
      test: /\.css$/,
      loader: [
        'style-loader',
        { loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // config: path.resolve(__dirname, '../postcss.config.js'),
            // ctx: {
            //   autoprefixer: { userConfig.browsersList }
            // },
            plugins: (loader) => [
              require('postcss-cssnext')({ browsersList }),
              require('precss')()
              // require('postcss-flexbugs-fixes'),
              // require('postcss-gradientfixer')
            ]
          }
        }
      ]
    }
  ]
}
