
export const THEME = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const LANG = {
    'JAVASCRIPT': 'javascript', 'HTML': 'html', 'CSS': 'css', 'JSON': 'json', 'TYPESCRIPT': 'typescript',
    'PYTHON': 'python', 'C++': 'cpp', 'C': 'c', 'C#': 'csharp', 'JAVA': 'java', 'GO': 'go', 'MARKDOWN': 'markdown',
    'SQL': 'sql', 'OBJECTIVE-C': 'objective-c', 'SWIFT': 'swift', 'KOTLIN': 'kotlin', 'PHP': 'php',
    'LESS': 'less', 'SCSS': 'scss', 'COFFEESCRIPT': 'coffeescript', 'MYSQL': 'mysql', 'XML': 'xml',
    'PASCAL': 'pascal', 'PERL': 'perl', 'LUA': 'lua', 'R': 'r', 'REDIS': 'redis', 'RUBY': 'ruby',
    'RUST': 'rust', 'SHELL': 'shell', 'POWERSHELL': 'powershell', 'YAML': 'yaml', 'DOCKERFILE': 'dockerfile',
    'GRAPHQL': 'graphql', 'HANDLEBARS': 'handlebars', 'BAT': 'bat', 'CLOJURE': 'clojure',
    'PLAINTEXT': 'plaintext', 'PUG': 'pug'
};

let Monaco = window.monaco;

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
            if (code) {
                this.changeLang(lang, code);
            }
        }
        if (theme !== THEME.LIGHT) {
            this.changeTheme(theme);
        } else {
            Editor.theme = THEME.LIGHT;
        }
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
        Monaco.editor.setTheme((theme === THEME.DARK ? 'vs-dark' : 'vs' ));
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
}