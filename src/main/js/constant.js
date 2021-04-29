export const MENU_TYPE = {
    OPEN: 'open',
    LINK: 'link',
    FUNC: 'func',
    SPLIT: 'split'
};

export const EVENT = {
    THEME_CHANGE: 'THEME_CHANGE',
    THEME_TOGGLE: 'THEME_TOGGLE',
    OPEN_LIB_CHOOSE: 'OPEN_LIB_CHOOSE',
    CLOSE_LIB_CHOOSE: 'CLOSE_LIB_CHOOSE',
    OPEN_ENV_CHOOSE: 'OPEN_ENV_CHOOSE',
    CLOSE_ENV_CHOOSE: 'CLOSE_ENV_CHOOSE',
    OPEN_LANG_CHOOSE: 'OPEN_LANG_CHOOSE',
    CLOSE_LANG_CHOOSE: 'CLOSE_LANG_CHOOSE',
    LANG_CHANGE: 'LANG_CHANGE',
    RESIZE: 'RESIZE',
    SET_CODE: 'SET_CODE',
    CODE_CHANGE: 'CODE_CHANGE',
    USE_CODE: 'USE_CODE',
    HTML_PANEL_CHANGE: 'HTML_PANEL_CHANGE',
    HTML_CONTENT_CHANGE: 'HTML_CONTENT_CHANGE',
    FONT_SIZE_CHANGE: 'FONT_SIZE_CHANGE',
    EDITOR_MOUNTED: 'EDITOR_MOUNTED',
    MIAN_EDITOR_INITED: 'MIAN_EDITOR_INITED',
    OPEN_CONFIRM: 'OPEN_CONFIRM',
    CLEAR_CODE: 'CLEAR_CODE',
    RESET_CODE: 'RESET_CODE',
    SAVE_CODE: 'SAVE_CODE',
    RUN_CODE: 'RUN_CODE',
    COPY_CODE: 'COPY_CODE',
    GENE_LINK: 'GENE_LINK',
    TOGGLE_LOG: 'TOGGLE_LOG',
    ADD_LIB: 'ADD_LIB',
    SET_ENV: 'SET_ENV',
    OPEN_DIFF: 'OPEN_DIFF',
    CURSOR_CHANGE: 'CURSOR_CHANGE',
    OPEN_FILE: 'OPEN_FILE',
    TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
    CONSOLE_VAL_CHANGE: 'CONSOLE_VAL_CHANGE',
    OPEN_CONFIG_CHOOSE: 'OPEN_CONFIG_CHOOSE',
    // drag相关
    DRAG_PERCENT: 'DRAG_PERCENT',
    DRAG_STATUS: 'DRAG_STATUS',
    CODE_DRAG_PERCENT: 'CODE_DRAG_PERCENT',
    CODE_DRAG_STATUS: 'CODE_DRAG_STATUS',
    FILE_DRAG_PERCENT: 'FILE_DRAG_PERCENT',
    FILE_DRAG_STATUS: 'FILE_DRAG_STATUS',
    FILE_CLICK: 'FILE_CLICK',
    SAVE_SINGLE_CODE: 'SAVE_SINGLE_CODE',

    // 多编辑器
    FILE_SHOW: 'FILE_SHOW',

    DIFF_CODE_CHOOSED: 'DIFF_CODE_CHOOSED',
    PASTE_FILE_CHANGE: 'PASTE_FILE_CHANGE',

    COPY: 'COPY',
    CUT: 'CUT',
    PASTE: 'PASTE',

    AUTO_FORMAT_CHANGE: 'AUTO_FORMAT_CHANGE',

    ON_FILE_OPEN: 'ON_FILE_OPEN',
    LOG_PANEL_VIS_CHANGE: 'LOG_PANEL_VIS_CHANGE',

};

export const TOOL_HEIGHT = 30;

export const THEME = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const LANG = { // 'csharp'
    'JAVASCRIPT': 'javascript', 'HTML': 'html', 'CSS': 'css', 'JSON': 'json', 'TYPESCRIPT': 'typescript',
    'PYTHON': 'python', 'C++': 'cpp', 'C': 'c', 'C#': 'csharp', 'JAVA': 'java', 'GO': 'go', 'MARKDOWN': 'markdown',
    'SQL': 'sql', 'OBJECTIVE-C': 'objective-c', 'SWIFT': 'swift', 'KOTLIN': 'kotlin', 'PHP': 'php',
    'LESS': 'less', 'SCSS': 'scss', 'COFFEESCRIPT': 'coffeescript', 'MYSQL': 'mysql', 'XML': 'xml',
    'PASCAL': 'pascal', 'PERL': 'perl', 'LUA': 'lua', 'R': 'r', 'REDIS': 'redis', 'RUBY': 'ruby',
    'RUST': 'rust', 'SHELL': 'shell', 'POWERSHELL': 'powershell', 'YAML': 'yaml', 'DOCKERFILE': 'dockerfile',
    'GRAPHQL': 'graphql', 'HANDLEBARS': 'handlebars', 'BAT': 'bat', 'CLOJURE': 'clojure',
    'PLAINTEXT': 'plaintext', 'PUG': 'pug', 'VUE': 'vue', 'JSX': 'jsx'
};

export const LANG_VALUES = Object.values(LANG);

export function getFinalLang (lang) {
    switch (lang) {
        case LANG.VUE:return LANG.HTML;
        case LANG.JSX:return LANG.JAVASCRIPT;
    }
    return lang;
}

export const ALIAS = {
    js: 'javascript',
    ts: 'typescript',
    // cs: 'coffeescript',
    cs: 'csharp',
    oc: 'objective-c',
    py: 'python',
    md: 'markdown',
};

export const DEFAULT_FONT_SIZE = 14;

export const MOUSE_BTN = {
    LEFT: 0,
    RIGHT: 2
};

export const ROOT = 'root';

export const FILE_TYPE = {
    FILE: 'file',
    DIR: 'dir',
    PROJECT: 'project'
};

export const DRAG_TYPE = {
    LOG: 'log',
    CODE: 'code',
    FILE: 'file'
};

export const KEY_CODE = {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
};

export const RENAME_ERROR = {
    REPEAT: 'REPEAT',
    NOT_VALID: 'NOT_VALID'
};

export const RENAME_ERROR_TEXT = {
    NO_ERROR: '',
    REPEAT: '此位置已存在该名称文件，请选择其他名称。',
    NOT_VALID: '文件名称中不可出现“\\ / : * ? " \' < > |”'
};

export const FILE_NONE = -1;

export const DROP_TYPE = {
    NONE: -1,
    HEADER: 0,
    FILE: 1,
};

export const SELECT_TYPE = {
    SELECTED: 0,
    MENU: 1,
    DRAG: 2,
    CONTENT: 3,
};

// 资源类型
export const RES_TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    ZIP: 'zip',
    CONFIG: 'config',
    EXE: 'exe',
    APK: 'apk',
    PPT: 'ppt',
    WORD: 'word',
    EXCEL: 'excel',
    PS: 'ps',
    FONT: 'font',
    LANG: 'lang',
    DIR: 'dir', // 文件夹

    DEFAULT: 'default',
};

export const FILE_SUFFIXS = {
    [RES_TYPE.IMAGE]: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
    [RES_TYPE.VIDEO]: ['mp4', 'flv', 'mov', 'avi', 'wmv', 'rmvb ', 'ogg', 'avi'],
    [RES_TYPE.AUDIO]: ['mp3', 'wma', 'wav'],
    [RES_TYPE.ZIP]: ['zip', 'rar'],
    [RES_TYPE.CONFIG]: ['config', 'conf'],
    [RES_TYPE.EXE]: ['exe', 'msi', 'dmg', 'iso'],
    [RES_TYPE.APK]: ['apk'],
    [RES_TYPE.PPT]: ['ppt', 'pptx', ],
    [RES_TYPE.WORD]: ['doc', 'docx'],
    [RES_TYPE.EXCEL]: ['xls', 'xlsx', 'csv'],
    [RES_TYPE.WORD]: ['doc', 'docx'],
    [RES_TYPE.PS]: ['psd'],
    [RES_TYPE.FONT]: ['ttf', 'fon', 'eot', 'otf', 'font', 'ttc', 'woff'],
};

export const SUFFIX_TO_RES_TYPE = (() => {
    const MAP = {};
    for (const resType in FILE_SUFFIXS) {
        FILE_SUFFIXS[resType].forEach(suffix => {
            MAP[suffix] = resType;
        });
    }
    return MAP;
})();


export const TOAST_TYPE = {
    SUCCESS: 'success',
    WARN: 'warning',
    INFO: 'info',
    ERROR: 'error'
};