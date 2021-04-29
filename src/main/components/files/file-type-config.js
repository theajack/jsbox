import {FILE_SUFFIXS, LANG, RES_TYPE} from '../../js/constant';

export const COLOR = {
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

// 根据语言类型缀名加样式
export const LANG_STYLE = {
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

// 根据文件全名加样式
export const FILE_NAME_STYLE = {
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

export const DEFAULT_STYLE = {
    light: '#444',
    dark: '#bbb',
    icon: 'ef-file-ge'
};

// 根据文件后缀名加样式
export const FILE_SUFFIX = [
    {
        suffixs: FILE_SUFFIXS[RES_TYPE.CONFIG],
        style: {
            light: '#666',
            dark: '#888',
            icon: 'ef-gear',
        }
    },
    {
        suffixs: FILE_SUFFIXS[RES_TYPE.IMAGE],
        style: {
            light: '#a074c4',
            dark: '#a074c4',
            icon: 'ei-file-image',
        }
    },
    {
        suffixs: FILE_SUFFIXS[RES_TYPE.VIDEO],
        style: {
            light: '#f55385',
            dark: '#f55385',
            icon: 'ei-play-sign',
        }
    },
    {
        suffixs: FILE_SUFFIXS[RES_TYPE.AUDIO],
        style: {
            light: '#a074c4',
            dark: '#a074c4',
            icon: 'ef-audio',
        }
    },
    {
        suffixs: FILE_SUFFIXS[RES_TYPE.APK],
        style: {
            light: '#a074c4',
            dark: '#a074c4',
            icon: 'ef-android',
        }
    }
];
