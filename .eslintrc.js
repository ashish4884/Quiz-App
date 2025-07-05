module.exports = {
  env: {
    browser: true,
    node: true, // ← add this line
    es2021: true,
     jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
      "react/prop-types": "off",

  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
