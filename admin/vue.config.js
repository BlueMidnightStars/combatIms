module.exports = {
    devServer: {
        proxy: 'http://localhost:3000',
      },
    outputDir: 'public',
    // Default: 'index.html',
    // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'
}