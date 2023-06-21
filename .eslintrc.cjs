/*
 * @Author: tackchen
 * @Date: 2022-09-04 08:02:56
 * @Description: Coding something
 */
module.exports = {
    // 'parser': '@typescript-eslint/parser',
    // "parser": "vue-eslint-parser",

    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended'
    ],
    plugins: [
        '@typescript-eslint',
    ],
    'env': {
        'node': true,
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-var': 'error',
        'vue/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface'
        ],
        '@typescript-eslint/no-unused-vars': 'error', // 使用 ts 未使用变量的规则 比如枚举类型在es中会报错
        'no-extend-native': 0,
        'no-new': 0,
        'no-useless-escape': 0,
        'no-useless-constructor': 0,
        'no-trailing-spaces': [ 'error', { 'skipBlankLines': true } ],
        'indent': [ 'error', 4, {
            'SwitchCase': 1
        } ],
        'space-infix-ops': [ 'error', { 'int32Hint': false } ],
        'space-before-function-paren': [ 'error', {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'always'
        } ],
        'semi': [ 'error', 'always' ],
        'comma-dangle': 0,
        'no-console': 0,
        'no-debugger': 0,
        'id-length': 0,
        'eol-last': 0,
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'arrow-spacing': 'error',
        'no-multiple-empty-lines': 'error',
        'no-unused-vars': 'error',
        'spaced-comment': 'error',
        'quotes': [ 'error', 'single', { 'allowTemplateLiterals': true } ],
        'no-unreachable': 'error',
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
        'semi-spacing': 'error',
        'comma-spacing': 'error',
        'key-spacing': 'error',
        'prefer-const': [ 'error', {
            'destructuring': 'any',
            'ignoreReadBeforeAssign': false
        } ],
        'space-infix-ops': 2,
        'no-irregular-whitespace': 2, // 不规则的空白不允许
        'no-trailing-spaces': 2, // 一行结束后面有空格就发出警告
        'vue/require-default-prop': 'off',
        '@typescript-eslint/no-empty-function': 1,
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'vue/no-setup-props-destructure': 'off',
    }
};
