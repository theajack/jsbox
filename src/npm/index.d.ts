declare type envs = "element-ui" | "cnchar" | "vue" | "react" | "angularjs";

declare type libs = "jquery" | "vue" | "react" | "react-dom" | "angularjs" | "vuex" | "redux" | "loadsh" | "virtual-dom" | "node-html-parser" | "jest" | "mocha" | "moment" | "dayjs" | "underscore" | "axios" | "qrcode" | "backbone" | "js-xlsx" | "recast" | "cnchar" | "cnchar-poly" | "cnchar-order" | "cnchar-trad" | "cnchar-draw" | "cnchar-all" | "easy-icon" | "element-ui" | "element-ui-style";

declare type lang = "js" | "ts" | "cs" | "oc" | "py" | "javascript" | "html" | "css" | "json" | "typescript" | "python" | "cpp" | "c" | "csharp" | "java" | "go" | "markdown" | "sql" | "objective-c" | "swift" | "kotlin" | "php" | "less" | "scss" | "coffeescript" | "mysql" | "xml" | "pascal" | "perl" | "lua" | "r" | "redis" | "ruby" | "rust" | "shell" | "powershell" | "yaml" | "dockerfile" | "graphql" | "handlebars" | "bat" | "clojure" | "plaintext" | "pug";

declare type theme = "dark" | "light";

declare interface PARAM {
    THEME: 'theme';
    CODE: 'code';
    LIB: 'lib';
    CONFIG: 'config';
    ID: 'id';
    ENV: 'env';
    RUN: 'run';
    REMIND: 'remind';
    MES: 'mes';
}

declare interface THEME {
    DARK: 'dark';
    LIGHT: 'light';
}

declare interface LIB {
    'jquery': 'jquery';
    'vue': 'vue';
    'react': 'react';
    'reactdom': 'react-dom';
    'angularjs': 'angularjs';
    'vuex': 'vuex';
    'redux': 'redux';
    'loadsh': 'loadsh';
    'virtualdom': 'virtual-dom';
    'nodehtmlparser': 'node-html-parser';
    'jest': 'jest';
    'mocha': 'mocha';
    'moment': 'moment';
    'dayjs': 'dayjs';
    'underscore': 'underscore';
    'axios': 'axios';
    'qrcode': 'qrcode';
    'backbone': 'backbone';
    'jsxlsx': 'js-xlsx';
    'recast': 'recast';
    'cnchar': 'cnchar';
    'cncharpoly': 'cnchar-poly';
    'cncharorder': 'cnchar-order';
    'cnchartrad': 'cnchar-trad';
    'cnchardraw': 'cnchar-draw';
    'cncharall': 'cnchar-all';
    'easyicon': 'easy-icon';
    'elementui': 'element-ui';
    'elementuistyle': 'element-ui-style'
}

declare interface ENV {
    'elementui': 'element-ui';
    'cnchar': 'cnchar';
    'vue': 'vue';
    'react': 'react';
    'angularjs': 'angularjs'
}

declare interface LANG {
    'JAVASCRIPT': 'javascript'; 'HTML': 'html'; 'CSS': 'css'; 'JSON': 'json'; 'TYPESCRIPT': 'typescript';
    'PYTHON': 'python'; 'C++': 'cpp'; 'C': 'c'; 'C#': 'csharp'; 'JAVA': 'java'; 'GO': 'go'; 'MARKDOWN': 'markdown';
    'SQL': 'sql'; 'OBJECTIVE-C': 'objective-c'; 'SWIFT': 'swift'; 'KOTLIN': 'kotlin'; 'PHP': 'php';
    'LESS': 'less'; 'SCSS': 'scss'; 'COFFEESCRIPT': 'coffeescript'; 'MYSQL': 'mysql'; 'XML': 'xml';
    'PASCAL': 'pascal'; 'PERL': 'perl'; 'LUA': 'lua'; 'R': 'r'; 'REDIS': 'redis'; 'RUBY': 'ruby';
    'RUST': 'rust'; 'SHELL': 'shell'; 'POWERSHELL': 'powershell'; 'YAML': 'yaml'; 'DOCKERFILE': 'dockerfile';
    'GRAPHQL': 'graphql'; 'HANDLEBARS': 'handlebars'; 'BAT': 'bat'; 'CLOJURE': 'clojure';
    'PLAINTEXT': 'plaintext'; 'PUG': 'pug'
}

declare interface config {
    theme?: theme;
    code?: string;
    lib?: Array<libs>;
    config?: string;
    id?: string;
    env?: envs;
    lang?: lang;
    run?: boolean;
    mes?: boolean;
    remind?: boolean;
}

declare interface JSBoxStatic {
    open(options?: config): void;
    config(options?: config): config;
    PARAM: PARAM;
    THEME: THEME;
    ENV: ENV;
    LIB: LIB;
    LANG: LANG;
}

declare const JSBox:JSBoxStatic;

export default JSBox;