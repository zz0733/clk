module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "globalReturn": true,
      "modules": true
    }
  },
  "rules": {
    "eol-last": 2,
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "quotes": [
      "error",
      "single"
    ],
    'eqeqeq': 0,
    "max-len": [
      "warn",
      150,
      4,
      {
        "comments": 150
      }
    ],
    "no-plusplus": 1,
    "no-bitwise": [
      "error",
      {
        "allow": [
          "~"
        ]
      }
    ],
    "no-unused-expressions": [
      "warn",
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ],
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none"
      }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "no-console": 0,
    "no-empty": 2,
    "no-regex-spaces": 2,
    "no-multi-spaces": 2,
    "no-extra-boolean-cast": 2,
  }
};
