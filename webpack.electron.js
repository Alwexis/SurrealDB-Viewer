const path = require('path');

module.exports = (config, context) => {
  // Resuelve el problema con el módulo 'fs'
  config.node = {
    fs: 'empty',
  };

  // Agrega la resolución para el módulo 'path'
  config.resolve.fallback = {
    path: require.resolve('path-browserify'),
  };

  // Permite el acceso al objeto 'process' en el entorno de Electron
  if (context.target === 'electron-renderer') {
    config.plugins.push(
      new context.webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      })
    );
  }

  return config;
};
