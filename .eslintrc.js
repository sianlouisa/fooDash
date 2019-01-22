module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': { extensions: ['.js', '.jsx'] },
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'react/no-unused-state': 1
  }
};
