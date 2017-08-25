const path = require('path');

let browsersList = [
  'last 4 versions',
  'Android >= 4.0',
  'Chrome >= 37',
  'iOS>=7'
];

let spriteOpts = {
  stylesheetPath: './client/style',
  spritePath: './client/slice/',
  relativeTo: 'rule',
  filterBy: (image) => {
    if (/image/i.test(image.url)) return Promise.reject();
    return Promise.resolve(image);
  },
  groupBy: (image) => {
    const groups = image.url.split('/', -1);
    if (groups.length < 3) return Promise.reject();
    let groupName = '';
    if (groups.length > 4) {
      groupName = groups[groups.length - 3] + '.' + groups[groups.length - 2];
    } else {
      groupName = groups[groups.length - 2];
    }
    return Promise.resolve(groupName);
  },
  hooks: {
    //更新生成后的规则，这里主要是改变了生成后的url访问路径
    onUpdateRule: function (rule, token, image) {
      let rel = path.relative(
        path.dirname(image.styleFilePath),
        path.resolve(__dirname, './src')
      );
      rel = rel.replace(/\\+/g, '\/');
      const spriteUrl = /\/sprite\/sprite.*/.exec(image.spriteUrl);
      image.spriteUrl = rel + spriteUrl;
      sprites.updateRule(rule, comment, image);
    }
  }
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
            plugins: (loader) => [
              require('postcss-cssnext')({ browsersList }),
              require('precss')(),
              require('postcss-sprites')
            ]
          }
        }
      ]
    }
  ]
}
