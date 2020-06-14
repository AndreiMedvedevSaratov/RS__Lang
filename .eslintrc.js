module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:vue/recommended',
		'@vue/airbnb',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		parser: 'babel-eslint',
	},
	plugins: [
		'vue',
	],
	rules: {
		'linebreak-style': 0,
		indent: [2, 'tab'],
		'no-tabs': 0,
	},
};
