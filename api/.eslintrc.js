module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended', 
	],
	parser: '@typescript-eslint/parser', 
	parserOptions: {
		ecmaVersion: 12,
		project: './tsconfig.json', 
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/no-explicit-any': ['off'],
	},
};
