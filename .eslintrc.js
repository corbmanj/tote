module.exports = {
	"parserOptions": {
        "ecmaVersion": 10,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
	},
	"parser": babel-eslint,
	"plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
	"rules": {
		"no-loop-func": 0,
		"operator-assignment": 0,
		"no-param-reassign": 1,
		"no-underscore-dangle": 0,
		"dot-notation": 1,
		"quotes": ["error", "single"],
		"no-tabs": 2,
		"comma-dangle": 0,
		"no-unused-expressions": 1,
		"arrow-body-style": 0,
		"max-len": 0,
		"no-nested-ternary": 0,
		"class-methods-use-this": 0,
		// "import/prefer-default-export": 0,
		// "import/no-extraneous-dependencies": 0,
		// "import/no-unresolved": 0,
		// "import/extensions": 0,
		// "jsx-a11y/anchor-is-valid": 0, // revisit
		// "jsx-a11y/click-events-have-key-events": 0, // revisit
		"react/destructuring-assignment": 0,
		"react/prefer-stateless-function": 0,
		"react/jsx-filename-extension": 0,
		"react/jsx-one-expression-per-line": 0,
		"react/no-multi-comp": [1, { "ignoreStateless": true }],
		"react/forbid-prop-types": 0,
		"react/sort-comp": 1,
		"react/no-unused-prop-types": 1,
		"react/no-did-mount-set-state": 0, // This is for async / await
		"react/button-has-type": 0,
		"react/prop-types": 0,
		"implicit-arrow-linebreak": 0,
		"function-paren-newline": 0
	},
	"plugins": [
		"react",
		// "jsx-a11y",
		// "import"
	],
	"globals": {
		"localStorage": true,
		"document": true,
		"window": true,
		"location": true,
		"require": true,
		"console": true,
		"module": true,
		"processs": true
	}
};
