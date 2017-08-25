const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('[name].css');

let browsersList = [
  'last 4 versions',
  'Android >= 4.0',
  'Chrome >= 37',
  'iOS>=7'
];

let postcssPlugin = [
  require('postcss-cssnext')({ browsersList }),
  require('precss')()
];

if (process.env.NODE_ENV === 'production') {
  let spriteOpts = {
    stylesheetPath: './client/style',
    spritePath: './publish/sprite/',
    spritesmith: {padding: 4},
    relativeTo: 'rule',
    filterBy: (image) => {
      if (/image/i.test(image.url)) return Promise.reject();
      return Promise.resolve(image);
    },
    groupBy: (image) => {
      let groups = image.url.split('/', -1);
      if (groups.length < 3) return Promise.reject();
      let groupName = '';
      if (groups.length > 4) {
        groupName = groups[groups.length - 3] + '.' + groups[groups.length - 2];
      } else {
        groupName = groups[groups.length - 2];
      }
      return Promise.resolve(groupName);
    }
  }

  postcssPlugin.push(
    require('postcss-sprites')(spriteOpts)
  )
}

let cssLoader;
if (process.env.NODE_ENV === 'production') {
  cssLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: (loader) => postcssPlugin
        }
      }
    ]
  })
} else {
  cssLoader = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => postcssPlugin
      }
    }
  ]
}


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
      test: /\.(jpe?g|png|gif|ttf|eot|woff2?)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    },
    {
      test: /\.css$/,
      use: cssLoader
    }
  ]
}
