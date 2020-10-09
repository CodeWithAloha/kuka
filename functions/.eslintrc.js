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
        "eslint-plugin-import",
        "@typescript-eslint"
    ],
    "extends": [
        "airbnb-typescript/base",
        "eslint:recommended",
    ],
    "rules": {
        "max-len": ["error", { "code": 120 }],
        "no-underscore-dangle": "off",

        // issue with "import type"
        "@typescript-eslint/no-unused-vars": "off",
        "no-unused-vars": "off",

        "@typescript-eslint/naming-convention": "off",
    }
};
