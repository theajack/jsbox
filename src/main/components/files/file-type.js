import {getLang} from '../js/file';
import {LANG} from '../../js/constant';

const COLOR = {
    YELLOW: {
        light: '#c7ba3b',
        dark: '#cbbf3f',
    },
    BLUE: {
        light: '#519aba',
        dark: '#519aba',
    },
    PINK: {
        light: '#f55385',
        dark: '#f55385',
    },
    GRAY: {
        light: '#4d5a5e',
        dark: '#4d5a5e',
    }
};

const LANG_STYLE = {
    [LANG.JAVASCRIPT]: {
        ...COLOR.YELLOW,
        icon: 'ef-js'
    },
    [LANG.TYPESCRIPT]: {
        light: '#49a4c9',
        dark: '#419aba',
        icon: 'ef-ts'
    },
    [LANG.VUE]: {
        light: '#7fae42',
        dark: '#8dc149',
        icon: 'ef-vue'
    },
    [LANG.JSX]: {
        light: '#498ba7',
        dark: '#519aba',
        icon: 'ef-react'
    },
    [LANG.JAVA]: {
        light: '#b8383d',
        dark: '#cc3144',
        icon: 'ef-java'
    },
    [LANG.JSON]: {
        ...COLOR.YELLOW,
        icon: 'ef-jsonld'
    },
    [LANG.C]: {
        ...COLOR.BLUE,
        icon: 'ef-c'
    },
    [LANG['C#']]: {
        ...COLOR.BLUE,
        icon: 'ef-csharp'
    },
    [LANG['C++']]: {
        ...COLOR.BLUE,
        icon: 'ef-cpp'
    },
    [LANG.SQL]: {
        ...COLOR.PINK,
        icon: 'ef-sql'
    },
    [LANG.MARKDOWN]: {
        ...COLOR.BLUE,
        icon: 'ef-markdown'
    },
    [LANG.HTML]: {
        light: '#c57733',
        dark: '#c57733',
        icon: 'ef-code'
    },
    [LANG.CSS]: {
        ...COLOR.BLUE,
        icon: 'ef-css',
    },
    [LANG.LESS]: {
        ...COLOR.BLUE,
        icon: 'ef-jsonld',
    },
    [LANG.SCSS]: {
        ...COLOR.PINK,
        icon: 'ef-code'
    }
};

const FILE_NAME_STYLE = {
    'webpack.config.js': {
        ...COLOR.BLUE,
        icon: 'ef-webpack'
    },
    '.babelrc': {
        ...COLOR.YELLOW,
        icon: 'ef-babel',
    },
    'babel.config.js': '.babelrc',
    'dockerfile': {
        ...COLOR.BLUE,
        icon: 'ef-docker'
    },
    '.eslintignore': {
        light: '#4d5a5e',
        dark: '#4d5a5e',
        icon: 'ef-eslint'
    },
    '.eslint.js': {
        ...COLOR.GRAY,
        icon: 'ef-eslint'
    },
    '.gitignore': {
        ...COLOR.GRAY,
        icon: 'ef-git'
    },
    'LICENSE': {
        ...COLOR.YELLOW,
        icon: 'ef-tcl',
    }
};

const DEFAULT_STYLE = {
    light: '#444',
    dark: '#bbb',
    icon: 'ef-file-ge'
};

export function getLangStyle (filename) {
    const fileNameItem = FILE_NAME_STYLE[filename];
    if (fileNameItem) {
        if (typeof fileNameItem === 'string') {
            return FILE_NAME_STYLE[fileNameItem];
        }
        return fileNameItem;
    }
    const lang = getLang(filename);
    let style = LANG_STYLE[lang];
    if (!style) {
        const suffix = getFileSuffix(filename);
        if (suffix) {
            const res = getStyleBySuffix(suffix);
            if (res) {
                style = res;
            } else {
                style = DEFAULT_STYLE;
            }
        } else {
            style = DEFAULT_STYLE;
        }
    }
    style.lang = lang;
    return style;
}


function getFileSuffix (filename) {
    if (typeof filename !== 'string') {
        return '';
    }
    const index = filename.lastIndexOf('.');
    if (index === -1) {
        return '';
    }
    return filename.substr(filename.lastIndexOf('.') + 1);
}


function getStyleBySuffix (suffix) {
    const res = FILE_Suffix.find(item => {
        return item.suffixs.includes(suffix);
    });
    if (res) {
        return res.style;
    }
    return null;
}

const FILE_Suffix = [
    {
        suffixs: ['config'],
        style: {
            light: '#666',
            dark: '#888',
            icon: 'ef-gear',
            type: 'config',
        }
    }
];