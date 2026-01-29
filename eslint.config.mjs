import globals from "globals";
import js from "@eslint/js"
import stylistics from "@stylistic/eslint-plugin"
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" },
    plugins: {
      js,
      "@stylistic": stylistics
    },
    extends: ["js/recommended"],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'windows'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'], 
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
    },
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { ignores: ["dist"] },
]);
