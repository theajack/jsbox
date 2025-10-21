/*
 * @Author: chenzhongsheng
 * @Date: 2023-08-14 21:31:45
 * @Description: Coding something
 */
import {languages, editor} from 'monaco-editor';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// @ts-ignore
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// @ts-ignore
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// @ts-ignore
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import {Registry} from 'monaco-textmate';
import {wireTmGrammars} from 'monaco-editor-textmate';
import typescriptReactTM from './TypeScriptReact.tmLanguage.json';
// import onigasm from 'onigasm/lib/onigasm.wasm?url';
import {loadWASM} from 'onigasm';
import vsDark from './vs_dark_good.json';

const onigasm = '/onigasm2.wasm';

const hookLanguages = languages.setLanguageConfiguration;
// @ts-ignore
self.MonacoEnvironment = {
    getWorker (_, label) {
        // console.log(_, label);
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    },
    // @ts-ignore
    onigasm,
};

export function initEditorConfig (type) {

    console.log('initEditorConfig', type);

    const compilerOptions = {
        jsx: languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
        allowNonTsExtensions: true,
        allowJs: true,
        target: languages.typescript.ScriptTarget.Latest,
    };

    languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions);
    languages.typescript.javascriptDefaults.setCompilerOptions(compilerOptions);

    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true
    });


    const registry = new Registry({
        async getGrammarDefinition () {
            return {
                format: 'json',
                content: typescriptReactTM,
            };
        },
    });


    const grammars = new Map();
    grammars.set('typescript', 'source.tsx');
    grammars.set('javascript', 'source.tsx');
    grammars.set('css', 'source.css');

    editor.defineTheme('vs-dark-plus', vsDark);


    languages.setLanguageConfiguration = (languageId, configuration) => {
        if (type === 'jsx') liftOff();
        return hookLanguages(languageId, configuration);
    };
    let loadingWasm;
    async function liftOff () {
        // @ts-ignore
        if (!loadingWasm) loadingWasm = loadWASM(self.MonacoEnvironment.onigasm);
        await loadingWasm;

        // wireTmGrammars only cares about the language part, but asks for all of monaco
        // we fool it by just passing in an object with languages
        await wireTmGrammars({languages}, registry, grammars);
    }
}


const hashType = getHashType();

window.onhashchange = () => {
    if (!location.hash) return;

    if (hashType !== getHashType()) {
        location.reload();
    }
};

function getHashType () {
    // return isVueDemo() ? 'html' : 'jsx';
    return 'html';
}

initEditorConfig(hashType);

export class Editor {
    dom = null;

    editor = null;

    constructor ({dom, onchange, code = ''}) {
        this.dom = dom;
        this.editor = editor.create(dom, {
            automaticLayout: true,
            value: code,
            padding: {top: 5},
            language: hashType === 'html' ? 'html' : 'typescript',
            theme: hashType === 'html' ? 'vs-dark' : 'vs-dark-plus',
            fontSize: 14,
            lineDecorationsWidth: 5,
            lineNumbersMinChars: 3,
            minimap: {
                enabled: false,
            }
        });

        // this.editor.setModel(codeModel);

        if (onchange) {
            this.editor.onDidChangeModelContent(() => {
                onchange(this.code());
            });
        }

    }
    code (v) {
        if (typeof v === 'string') {
            this.editor.setValue(v);
            return this;
        } else {
            return this.editor.getValue();
        }
    }
}
