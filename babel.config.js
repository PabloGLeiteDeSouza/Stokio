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
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@assets': './src/assets',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@app': './src/app',
            '@screens': './src/app/screens',
            $types: './src/types',
            $assets: './src/assets',
            $providers: './src/providers',
            '@classes': './src/classes',
          },
        },
      ],
    ],
  };
};
