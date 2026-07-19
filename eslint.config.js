import { fixupConfigRules } from "@eslint/compat"
import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginPrettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

export default fixupConfigRules([
  {
    ignores: ["dist", "build", "package-lock.json"]
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ...js.configs.recommended
  },
  {
    files: ["**/*.{js,jsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "19"
      }
    },
    rules: {
      "react/prop-types": "off"
    }
  },
  {
    files: ["**/*.{js,jsx}"],
    ...reactHooks.configs.flat.recommended
  },
  {
    files: ["**/*.{js,jsx}"],
    ...reactRefresh.configs.vite
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": "error",
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["useThreeAppActions"] }
      ],
      ...eslintConfigPrettier.rules
    }
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest
      }
    }
  },
  {
    files: ["vite.config.js", "eslint.config.js"],
    languageOptions: {
      globals: globals.node
    }
  }
])
