module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "eslint-plugin-import",
        "@typescript-eslint"
    ],
    "extends": [
        // "react-app",
        "airbnb-typescript",
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "pragma"     : "React",
            "version"    : "detect",
        },
    },
    "globals": {
        "process": true
    },
    "rules": {
        "max-len": ["error", { "code": 120 }],

        // https://github.com/typescript-eslint/typescript-eslint/issues/2315
        // There is an outstanding issue for "import type" statements
        "no-duplicate-imports": "off",

        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-namespace": "error",
        // "@typescript-eslint/no-param-reassign": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/triple-slash-reference": "error",
        "@typescript-eslint/unified-signatures": "warn",

        "react/no-array-index-key": "off",

        // proptypes aren't used
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "warn",

        // Disable old rules, overridden by @typescript-eslint
        "no-unused-vars": "off",
    }
};
