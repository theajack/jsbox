/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 1.10.0(1b4729c63bdb0d1e06d4e637e5c3977ddeb714dd)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
DEFINE('vs/basic-languages/typescript/typescript', [
    'require',
    'exports'
], function(e, t) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = 'undefined' == typeof monaco ? self.monaco : monaco;
    (t.conf = {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: { lineComment: '//', blockComment: ['/*', '*/'] },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        onEnterRules: [
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: {
                    indentAction: n.languages.IndentAction.IndentOutdent,
                    appendText: ' * '
                }
            },
            {
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: {
                    indentAction: n.languages.IndentAction.None,
                    appendText: ' * '
                }
            },
            {
                beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: {
                    indentAction: n.languages.IndentAction.None,
                    appendText: '* '
                }
            },
            {
                beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                action: {
                    indentAction: n.languages.IndentAction.None,
                    removeText: 1
                }
            }
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"', notIn: ['string'] },
            { open: "'", close: "'", notIn: ['string', 'comment'] },
            { open: '`', close: '`', notIn: ['string', 'comment'] },
            { open: '/**', close: ' */', notIn: ['string'] }
        ],
        folding: {
            markers: {
                start: new RegExp('^\\s*//\\s*#?region\\b'),
                end: new RegExp('^\\s*//\\s*#?endregion\\b')
            }
        }
    }),
        (t.language = {
            defaultToken: 'invalid',
            tokenPostfix: '.ts',
            keywords: [
                'abstract',
                'as',
                'break',
                'case',
                'catch',
                'class',
                'continue',
                'const',
                'constructor',
                'debugger',
                'declare',
                'default',
                'delete',
                'do',
                'else',
                'enum',
                'export',
                'extends',
                'false',
                'finally',
                'for',
                'from',
                'function',
                'get',
                'if',
                'implements',
                'import',
                'in',
                'infer',
                'instanceof',
                'interface',
                'is',
                'keyof',
                'let',
                'module',
                'namespace',
                'never',
                'new',
                'null',
                'package',
                'private',
                'protected',
                'public',
                'readonly',
                'require',
                'global',
                'return',
                'set',
                'static',
                'super',
                'switch',
                'symbol',
                'this',
                'throw',
                'true',
                'try',
                'type',
                'typeof',
                'unique',
                'var',
                'void',
                'while',
                'with',
                'yield',
                'async',
                'await',
                'of'
            ],
            typeKeywords: [
                'any',
                'boolean',
                'number',
                'object',
                'string',
                'undefined'
            ],
            operators: [
                '<=',
                '>=',
                '==',
                '!=',
                '===',
                '!==',
                '=>',
                '+',
                '-',
                '**',
                '*',
                '/',
                '%',
                '++',
                '--',
                '<<',
                '</',
                '>>',
                '>>>',
                '&',
                '|',
                '^',
                '!',
                '~',
                '&&',
                '||',
                '??',
                '?',
                ':',
                '=',
                '+=',
                '-=',
                '*=',
                '**=',
                '/=',
                '%=',
                '<<=',
                '>>=',
                '>>>=',
                '&=',
                '|=',
                '^=',
                '@'
            ],
            symbols: /[=><!~?:&|+\-*\/\^%]+/,
            escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
            digits: /\d+(_+\d+)*/,
            octaldigits: /[0-7]+(_+[0-7]+)*/,
            binarydigits: /[0-1]+(_+[0-1]+)*/,
            hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
            regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
            regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
            tokenizer: {
                root: [[/[{}]/, 'delimiter.bracket'], { include: 'common' }],
                common: [
                    [
                        /[a-z_$][\w$]*/,
                        {
                            cases: {
                                '@typeKeywords': 'keyword',
                                '@keywords': 'keyword',
                                '@default': 'identifier'
                            }
                        }
                    ],
                    [/[A-Z][\w\$]*/, 'type.identifier'],
                    { include: '@whitespace' },
                    [
                        /\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,
                        { token: 'regexp', bracket: '@open', next: '@regexp' }
                    ],
                    [/[()\[\]]/, '@brackets'],
                    [/[<>](?!@symbols)/, '@brackets'],
                    [/!(?=([^=]|$))/, 'delimiter'],
                    [
                        /@symbols/,
                        { cases: { '@operators': 'delimiter', '@default': '' } }
                    ],
                    [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
                    [
                        /(@digits)\.(@digits)([eE][\-+]?(@digits))?/,
                        'number.float'
                    ],
                    [/0[xX](@hexdigits)n?/, 'number.hex'],
                    [/0[oO]?(@octaldigits)n?/, 'number.octal'],
                    [/0[bB](@binarydigits)n?/, 'number.binary'],
                    [/(@digits)n?/, 'number'],
                    [/[;,.]/, 'delimiter'],
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],
                    [/'([^'\\]|\\.)*$/, 'string.invalid'],
                    [/"/, 'string', '@string_double'],
                    [/'/, 'string', '@string_single'],
                    [/`/, 'string', '@string_backtick']
                ],
                whitespace: [
                    [/[ \t\r\n]+/, ''],
                    [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
                    [/\/\*/, 'comment', '@comment'],
                    [/\/\/.*$/, 'comment']
                ],
                comment: [
                    [/[^\/*]+/, 'comment'],
                    [/\*\//, 'comment', '@pop'],
                    [/[\/*]/, 'comment']
                ],
                jsdoc: [
                    [/[^\/*]+/, 'comment.doc'],
                    [/\*\//, 'comment.doc', '@pop'],
                    [/[\/*]/, 'comment.doc']
                ],
                regexp: [
                    [
                        /(\{)(\d+(?:,\d*)?)(\})/,
                        [
                            'regexp.escape.control',
                            'regexp.escape.control',
                            'regexp.escape.control'
                        ]
                    ],
                    [
                        /(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
                        [
                            'regexp.escape.control',
                            {
                                token: 'regexp.escape.control',
                                next: '@regexrange'
                            }
                        ]
                    ],
                    [
                        /(\()(\?:|\?=|\?!)/,
                        ['regexp.escape.control', 'regexp.escape.control']
                    ],
                    [/[()]/, 'regexp.escape.control'],
                    [/@regexpctl/, 'regexp.escape.control'],
                    [/[^\\\/]/, 'regexp'],
                    [/@regexpesc/, 'regexp.escape'],
                    [/\\\./, 'regexp.invalid'],
                    [
                        /(\/)([gimsuy]*)/,
                        [
                            {
                                token: 'regexp',
                                bracket: '@close',
                                next: '@pop'
                            },
                            'keyword.other'
                        ]
                    ]
                ],
                regexrange: [
                    [/-/, 'regexp.escape.control'],
                    [/\^/, 'regexp.invalid'],
                    [/@regexpesc/, 'regexp.escape'],
                    [/[^\]]/, 'regexp'],
                    [
                        /\]/,
                        {
                            token: 'regexp.escape.control',
                            next: '@pop',
                            bracket: '@close'
                        }
                    ]
                ],
                string_double: [
                    [/[^\\"]+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [/"/, 'string', '@pop']
                ],
                string_single: [
                    [/[^\\']+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [/'/, 'string', '@pop']
                ],
                string_backtick: [
                    [
                        /\$\{/,
                        { token: 'delimiter.bracket', next: '@bracketCounting' }
                    ],
                    [/[^\\`$]+/, 'string'],
                    [/@escapes/, 'string.escape'],
                    [/\\./, 'string.escape.invalid'],
                    [/`/, 'string', '@pop']
                ],
                bracketCounting: [
                    [/\{/, 'delimiter.bracket', '@bracketCounting'],
                    [/\}/, 'delimiter.bracket', '@pop'],
                    { include: 'common' }
                ]
            }
        });
}),
    DEFINE('vs/basic-languages/javascript/javascript', [
        'require',
        'exports',
        '../typescript/typescript'
    ], function(e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        'undefined' == typeof monaco ? self.monaco : monaco;
        (t.conf = n.conf),
            (t.language = {
                // Set defaultToken to invalid to see what you do not tokenize yet
                defaultToken: 'invalid',
                tokenPostfix: '.js',
                keyword1: ['var', 'new', 'const', 'let', 'typeof', 'in', 'function', 'this', 'true', 'false', 'null', 'undefined', 'async', 'delete', 'class', 'extends'], // var
                keyword2: ['return', 'for', 'while', 'else if', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue', 'await', 'yield', 'try', 'catch', 'finally', 'throw', 'export', 'import', 'from'], // return
                keyword3: ['console', 'window', 'document', 'Date', 'Array', 'Object', 'Boolean', 'Number', 'String', 'alert', 'RegExp', 'Function', 'JSON', 'Date'], // Date
                // keywords: [
                //     'break', 'case', 'catch', 'class', 'continue', 'const',
                //     'constructor', 'debugger', 'default', 'delete', 'do', 'else',
                //     'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
                //     'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null',
                //     'return', 'set', 'super', 'switch', 'symbol', 'this', 'throw', 'true',
                //     'try', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield',
                //     'async', 'await', 'of'
                // ],
                // keywords2: [
                //     'document'
                // ],
            
                // typeKeywords: [
                //     'any', 'boolean', 'number', 'object', 'string', 'undefined'
                // ],
            
                operators: [
                    '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
                    '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
                    '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
                    '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
                    '^=', '@',
                ],
            
                // we include these common regular expressions
                symbols: /[=><!~?:&|+\-*\/\^%]+/,
                escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                digits: /\d+(_+\d+)*/,
                octaldigits: /[0-7]+(_+[0-7]+)*/,
                binarydigits: /[0-1]+(_+[0-1]+)*/,
                hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
            
                regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
                regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
            
                // The main tokenizer for our languages
                tokenizer: {
                    root: [
                        [/[{}]/, 'delimiter.bracket'],
                        {include: 'common'}
                    ],
            
                    common: [
                        // identifiers and keywords
                        // [/document/, 'type.identifier'],
                        [/[a-z_$][\w$]*/, {
                            cases: {
                                // '@typeKeywords': 'keyword',
                                '@keyword1': 'keyword1',
                                '@keyword2': 'keyword2',
                                '@keyword3': 'keyword3',
                                '@default': 'identifier',
                            }
                        }],
                        [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
                        // [/\..*?\(/, 'function'],  // to show class names nicely
                        // [/[A-Z][\w\$]*/, 'identifier'],
            
                        // whitespace
                        {include: '@whitespace'},
            
                        // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
                        [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, {token: 'regexp', bracket: '@open', next: '@regexp'}],
            
                        // delimiters and operators
                        [/[()\[\]]/, '@brackets'],
                        [/[<>](?!@symbols)/, '@brackets'],
                        [/@symbols/, {
                            cases: {
                                '@operators': 'delimiter',
                                '@default': ''
                            }
                        }],
            
                        // numbers
                        [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
                        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
                        [/0[xX](@hexdigits)/, 'number.hex'],
                        [/0[oO]?(@octaldigits)/, 'number.octal'],
                        [/0[bB](@binarydigits)/, 'number.binary'],
                        [/(@digits)/, 'number'],
            
                        // delimiter: after number because of .\d floats
                        [/[;,.]/, 'delimiter'],
            
                        // strings
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                        [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                        [/"/, 'string', '@string_double'],
                        [/'/, 'string', '@string_single'],
                        [/`/, 'string', '@string_backtick'],
                    ],
            
                    whitespace: [
                        [/[ \t\r\n]+/, ''],
                        [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
                        [/\/\*/, 'comment', '@comment'],
                        [/\/\/.*$/, 'comment'],
                    ],
            
                    comment: [
                        [/[^\/*]+/, 'comment'],
                        [/\*\//, 'comment', '@pop'],
                        [/[\/*]/, 'comment']
                    ],
            
                    jsdoc: [
                        [/[^\/*]+/, 'comment.doc'],
                        [/\*\//, 'comment.doc', '@pop'],
                        [/[\/*]/, 'comment.doc']
                    ],
            
                    // We match regular expression quite precisely
                    regexp: [
                        [/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
                        [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', {token: 'regexp.escape.control', next: '@regexrange'}]],
                        [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
                        [/[()]/, 'regexp.escape.control'],
                        [/@regexpctl/, 'regexp.escape.control'],
                        [/[^\\\/]/, 'regexp'],
                        [/@regexpesc/, 'regexp.escape'],
                        [/\\\./, 'regexp.invalid'],
                        [/(\/)([gimsuy]*)/, [{token: 'regexp', bracket: '@close', next: '@pop'}, 'keyword.other']],
                    ],
            
                    regexrange: [
                        [/-/, 'regexp.escape.control'],
                        [/\^/, 'regexp.invalid'],
                        [/@regexpesc/, 'regexp.escape'],
                        [/[^\]]/, 'regexp'],
                        [/\]/, {token: 'regexp.escape.control', next: '@pop', bracket: '@close'}],
                    ],
            
                    string_double: [
                        [/[^\\"]+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/"/, 'string', '@pop']
                    ],
            
                    string_single: [
                        [/[^\\']+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/'/, 'string', '@pop']
                    ],
            
                    string_backtick: [
                        [/\$\{/, {token: 'delimiter.bracket', next: '@bracketCounting'}],
                        [/[^\\`$]+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/`/, 'string', '@pop']
                    ],
            
                    bracketCounting: [
                        [/\{/, 'delimiter.bracket', '@bracketCounting'],
                        [/\}/, 'delimiter.bracket', '@pop'],
                        {include: 'common'}
                    ],
                },
            });
    });
