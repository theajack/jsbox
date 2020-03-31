import javascript from './javascript';
export const THEME = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const LANG = {
    'JAVASCRIPT': 'jx-js', 'HTML': 'html', 'CSS': 'css', 'JSON': 'json', 'TYPESCRIPT': 'typescript',
    'PYTHON': 'python', 'C++': 'cpp', 'C': 'c', 'C#': 'csharp', 'JAVA': 'java', 'GO': 'go', 'MARKDOWN': 'markdown',
    'SQL': 'sql', 'OBJECTIVE-C': 'objective-c', 'SWIFT': 'swift', 'KOTLIN': 'kotlin', 'PHP': 'php',
    'LESS': 'less', 'SCSS': 'scss', 'COFFEESCRIPT': 'coffeescript', 'MYSQL': 'mysql', 'XML': 'xml',
    'PASCAL': 'pascal', 'PERL': 'perl', 'LUA': 'lua', 'R': 'r', 'REDIS': 'redis', 'RUBY': 'ruby',
    'RUST': 'rust', 'SHELL': 'shell', 'POWERSHELL': 'powershell', 'YAML': 'yaml', 'DOCKERFILE': 'dockerfile',
    'GRAPHQL': 'graphql', 'HANDLEBARS': 'handlebars', 'BAT': 'bat', 'CLOJURE': 'clojure',
    'PLAINTEXT': 'plaintext', 'PUG': 'pug'
};

let Monaco = window.monaco;
Monaco.languages.register({id: 'jx-js'});
Monaco.languages.setMonarchTokensProvider('jx-js', javascript);
Monaco.editor.defineTheme('vsc-dark', {
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
Monaco.editor.defineTheme('vsc-light', {
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

export class Editor {
    constructor ({
        el,
        code = '',
        diffCode = '',
        lang = LANG.JAVASCRIPT,
        theme = THEME.LIGHT
    }) {
        this.lang = lang;
        this.el = (typeof el === 'string') ? document.querySelector(el) : el;
        if (diffCode) {
            this.type = 'diff-editor';
            this.diffCode = diffCode;
            this.editor = Monaco.editor.createDiffEditor(this.el, {
                enableSplitViewResizing: false
            });
            this.changeLang(lang, code);
        } else {
            this.type = 'editor';
            this.editor = Monaco.editor.create(this.el, {
                model: null,
            });
            this.changeLang(lang, code);
        }
        if (theme !== THEME.LIGHT) {
            this.changeTheme(theme);
        } else {
            Editor.theme = THEME.LIGHT;
        }
        window.editor = this.editor;
    }
    changeLang (lang, code) {
        code = code || this.code();
        let oldModel = this.editor.getModel();
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
        Editor.theme = theme;
        // Monaco.editor.setTheme((theme === THEME.DARK ? 'vs-dark' : 'vs' ));
        Monaco.editor.setTheme('vsc-dark');
    }
    destroy () {
        if (this.editor.getModel()) {
            this.editor.getModel().dispose();
        }
        this.editor.dispose();
        this.editor = null;
    }
    code (v) {
        if (v) {
            this.editor.setValue(v);
            return this;
        } else {
            return this.editor.getValue();
        }
    }
    resize () {
        if (this.editor)
            this.editor.layout();
    }
}