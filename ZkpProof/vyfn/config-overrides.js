const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Add fallbacks for node modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "buffer": require.resolve("buffer"),
    "path": require.resolve("path-browserify")
  });
  config.resolve.fallback = fallback;

  // Add aliases
  config.resolve.alias = {
    ...config.resolve.alias,
    'process': 'process/browser.js'
  };

  // Add plugins
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  // Add resolve extensions and modules
  config.resolve.extensions = [...(config.resolve.extensions || []), '.js', '.jsx', '.mjs'];
  config.resolve.modules = ['node_modules', path.resolve(__dirname, 'src')];

  // Configure module rules
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false
      }
    },
    {
      test: /\.wasm$/,
      type: 'webassembly/async'
    }
  ];

  // Enable WebAssembly
  config.experiments = {
    asyncWebAssembly: true,
    syncWebAssembly: true
  };

  // Ignore warnings
  config.ignoreWarnings = [/Failed to parse source map/];
  
  return config;
}; 