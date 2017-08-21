module.exports = ({ file, options, env }) => ({
  console.log(options)
  console.log(env)
  plugins: {
    // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
    // 'autoprefixer': ({ options }),
    'autoprefixer': options.autoprefixer,
    'postcss-flexbugs-fixes'
  }
})