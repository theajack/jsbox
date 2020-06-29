// import {liftOff} from '../../js/grammars/configure-tokenizer';

import {globalFileAttr} from '../files/file';
import {LANG, THEME, DEFAULT_FONT_SIZE} from '../../js/constant';

// import html from './html';
// import javascript from './javascript';
// import 'monaco-editor/min/vs/loader';
// import 'monaco-editor/esm/vs/nls';
// import * as Monaco from 'monaco-editor/esm/vs/editor/editor.main';

// import 'monaco-editor/esm/vs/language/typescript/tsMode';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript';
// import 'monaco-editor/esm/vs/basic-languages/typescript/typescript';

const MAX_FONT_SIZE = 20;
const MIN_FONT_SIZE = 10;
let Monaco = null;

export function loadMonaco () {
    let timer = null;
    return new Promise((resolve) => {
        if (window.monaco) {
            resolve(window.monaco);
        } else {
            timer = setInterval(() => {
                if (window.monaco) {
                    resolve(window.monaco);
                    clearInterval(timer);
                }
            }, 200);
        }
    });
}

function initMonaco () {
    if (Monaco === null) {
        Monaco = window.monaco;
        // liftOff(Monaco);
        // Monaco.languages.register({id: 'jx-js'});
        // Monaco.languages.setMonarchTokensProvider('jx-js', javascript);
        // Monaco.languages.register({id: 'jx-html'});
        // Monaco.languages.setMonarchTokensProvider('jx-html', html);
        window.monaco.editor.defineTheme('vsc-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                {token: 'keyword1', foreground: '569cd6'},
                {token: 'keyword2', foreground: 'c586c0'},
                {token: 'keyword3', foreground: '3ac9b0'},
                {token: 'identifier', foreground: '9cdcfe'},
                {token: 'function', foreground: 'dcdcaa'}
            ]
        });
        window.monaco.editor.defineTheme('vsc-light', {
            base: 'vs',
            inherit: true,
            rules: [
                {token: 'keyword1', foreground: '0000ff'},
                {token: 'keyword2', foreground: 'af00db'},
                {token: 'keyword3', foreground: '267f99'},
                {token: 'identifier', foreground: '001090'},
                {token: 'function', foreground: 'b27878'}
            ]
        });
    }
}
export class Editor {
    constructor ({
        el,
        code = '',
        diffCode = '',
        lang = LANG.JAVASCRIPT,
        theme = THEME.LIGHT,
        fontSize = DEFAULT_FONT_SIZE,
        onchange = null,
        oncursorchange = null,
        option = {}
    }) {
        initMonaco();
        this.onchange = onchange;
        this.oncursorchange = oncursorchange;
        this.fontSize = fontSize;
        this.lang = lang;
        this.option = option;
        this.el = (typeof el === 'string') ? document.querySelector(el) : el;
        if (diffCode) {
            this.type = 'diff-editor';
            this.diffCode = diffCode;
        } else {
            this.type = 'editor';
        }
        this._initEditor(code);
        this.changeTheme(theme);
        // if (theme !== THEME.LIGHT) {
        //     this.changeTheme(theme);
        // } else {
        //     Editor.theme = THEME.LIGHT;
        // }
    }
    _initEditor (code) {
        code = typeof code === 'string' ? code : this.code();
        if (this.editor)
            this.destroy();
        this.option.fontSize = this.fontSize;
        if (this.type === 'diff-editor') {
            this.option.enableSplitViewResizing = false;
            this.editor = Monaco.editor.createDiffEditor(this.el, this.option);
            this.changeLang(this.lang, code);
        } else {
            this.option.model = null;
            this.option.fontSize = this.fontSize;
            this.editor = Monaco.editor.create(this.el, this.option);
            this.changeLang(this.lang, code);
        }
        if (this.onchange) {
            this._keyDownChange = false;
            this._preCode = code;
            this._fileId = globalFileAttr.openedId;
            this.editor.onDidChangeModelContent(() => {
                let code = this.code();
                if (this._keyDownChange && this._fileId === globalFileAttr.openedId) {
                    this.onchange(code);
                    this._keyDownChange = false;
                } else {
                    this._fileId = globalFileAttr.openedId;
                }
            });
            this.editor.onKeyDown(() => {
                this._keyDownChange = true;
            });
            // window.editor = this.editor;
        }
        if (this.oncursorchange) {
            this.editor.onDidChangeCursorPosition((e) => {
                this.oncursorchange(e.position);
            });
        }
    }
    setFontSize (size) {
        if (size > MAX_FONT_SIZE || size < MIN_FONT_SIZE || size === this.fontSize) {
            return false;
        }
        this.fontSize = size;
        this._initEditor();
        return true;
    }
    fontSizeUp () {
        return this.setFontSize(this.fontSize + 1);
    }
    fontSizeDown () {
        return this.setFontSize(this.fontSize - 1);
    }
    changeLang (lang, code) {
        // if (lang === this.lang) {
        //     return;
        // }
        code = code || this.code();
        let oldModel = this.editor.getModel();
        this.lang = lang;
        if (this.type === 'editor') {
            let newModel = Monaco.editor.createModel(code, lang);
            this.editor.setModel(newModel);
            if (oldModel) {
                oldModel.dispose();
            }
        } else {
            let original = Monaco.editor.createModel(this.diffCode, lang);
            let modified = Monaco.editor.createModel(code, lang);
            this.editor.setModel({
                original,
                modified
            });
            if (oldModel) {
                if (oldModel.original) {oldModel.original.dispose();}
                if (oldModel.modified) {oldModel.modified.dispose();}
            }
        }
    }
    changeTheme (theme) {
        if (theme === Editor.theme) {
            return;
        }
        Editor.theme = theme;
        console.log(theme);
        Monaco.editor.setTheme((theme === THEME.DARK ? 'vsc-dark' : 'vsc-light' ));
        return theme;
    }
    toggleTheme () {
        return this.changeTheme((Editor.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK ));
    }
    destroy () {
        let model = this.editor.getModel();
        if (model) {
            if (this.type === 'editor') {
                model.dispose();
            } else {
                model.original.dispose();
                model.modified.dispose();
            }
        }
        this.editor.dispose();
        this.editor = null;
    }
    code (v) {
        if (typeof v === 'string') {
            if (this.type === 'editor') {
                this.editor.setValue(v);
            } else {
                this.editor.getModel().modified.setValue(v);
            }
            return this;
        } else {
            if (this.type === 'editor') {
                return this.editor.getValue();
            }
            return this.editor.getModel().modified.getValue();
        }
    }
    resize () {
        if (this.editor)
            this.editor.layout();
    }
    getPosition () {
        if (this.editor)
            return this.editor.getPosition();
        return {lineNumber: 0, column: 0};
    }
    getLines (code) {
        if (typeof code === 'string') {
            return code.split('\n').length;
        }
        return this.code().split('\n').length;
    }
    focusEnd (needFocus = true) {
        let arr = this.code().split('\n');
        this.editor.setPosition({
            lineNumber: arr.length,
            column: arr[arr.length - 1].length + 1
        });
        if (needFocus)
            this.focus();
    }
    focus () {
        this.editor.focus();
    }
}