module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: [
        "vue", 
        "react"
    ],
    rules: {},
    settings:{
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use,
                                               // default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
                                 // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                                 // default to latest and warns if missing
                                 // It will default to "detect" in the future
            "flowVersion": "0.53" // Flow version
          },
    }
};
