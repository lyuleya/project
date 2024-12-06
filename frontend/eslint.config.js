import babelParser from "@babel/eslint-parser";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier: prettier,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": "error",
      "import/named": "error",
      "no-undef": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^\\./(?!.*\\.css$)", "^\\.\\./"],
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "prettier/prettier": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".css"],
          moduleDirectory: ["node_modules", "src"],
        },
      },
    },
  },
];