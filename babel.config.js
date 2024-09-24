module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: '.',
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          alias: {
            $components: './components',
            $screens: './screens',
            $types: './types',
            $assets: './assets',
            $databases: './databases',
            $functions: './functions',
            $providers: './providers',
            $classes: './classes',
            $constants: './constants',
            $utils: './utils',
            'messages-success': './constants/messages/MessagesSuccess',
            'messages-error': './constants/messages/errors',
            messageerrors: './constants/messages/errors',
            'messages-warnings': './constants/messages/warnings',
          },
        },
      ],
    ],
  };
};
