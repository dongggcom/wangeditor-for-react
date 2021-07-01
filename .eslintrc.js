/*
 * @Author: donggg
 * @LastEditors: donggg
 * @Date: 2021-07-01 09:52:25
 * @LastEditTime: 2021-07-01 11:18:05
 */
module.exports =  {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
	  'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  settings: {
    react: {
      version: 'detect', 
    },
  },
};
