import event from '../../js/event';
import {EVENT, LANG} from '../../js/constant';
import {language} from '../../js/status';
import {toast} from '../../js/util';

let downloadLink = null;
let fileInput = null;

const SUFFIX = {
    'JAVASCRIPT': 'js', 'HTML': 'html', 'CSS': 'css', 'JSON': 'json', 'TYPESCRIPT': 'ts',
    'PYTHON': 'py', 'C++': 'cpp', 'C': 'c', 'C#': 'cs', 'JAVA': 'java', 'GO': 'go', 'MARKDOWN': 'md',
    'SQL': 'sql', 'OBJECTIVE-C': 'm', 'SWIFT': 'swift', 'KOTLIN': '.kt', 'PHP': 'php',
    'LESS': 'less', 'SCSS': 'scss', 'COFFEESCRIPT': 'coffee', 'MYSQL': 'sql', 'XML': 'xml',
    'PASCAL': 'pascal', 'PERL': 'perl', 'LUA': 'lua', 'R': 'r', 'REDIS': 'redis', 'RUBY': 'ruby',
    'RUST': 'rs', 'SHELL': 'sh', 'POWERSHELL': 'sh', 'YAML': 'yml', 'DOCKERFILE': '',
    'GRAPHQL': 'graphql', 'HANDLEBARS': 'handlebars', 'BAT': 'bat', 'CLOJURE': 'clj',
    'PLAINTEXT': 'txt', 'PUG': 'pug', 'VUE': 'vue', 'JSX': 'jsx'
};

function getSuffix (language) {
    for (const k in LANG) {
        if (LANG[k] === language) {
            if (SUFFIX[k]) {
                return '.' + SUFFIX[k];
            }
            return '';
        }
    }
    return '.' + language;
}

export function getLang (fileName) {
    let suffix = '';
    if (fileName.indexOf('.') === -1) {
        return LANG.PLAINTEXT;
    }
    suffix = fileName.substr(fileName.lastIndexOf('.') + 1);
    for (const k in SUFFIX) {
        if (SUFFIX[k] === suffix) {
            return LANG[k];
        }
    }
    return suffix;
}
window.getLang = getLang;

 
export function download () {
    if (!downloadLink) {
        downloadLink = document.createElement('a');
        downloadLink.setAttribute('style', 'position: fixed;top: -100px');
        document.body.appendChild(downloadLink);
    }
    const lang = language.get();
    downloadLink.setAttribute('download', `jxbox-${lang}${getSuffix(language.get())}`);
    event.emit(EVENT.USE_CODE, code => {
        const blob = new Blob([code], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.click();
    });
}

export function openFile () {
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('style', 'position: fixed;top: -100px');
        document.body.appendChild(fileInput);
        fileInput.onchange = function () {
            const file = this.files[0];
            if (!file) {
                return;
            }
            const lang = getLang(file.name);
            if (lang !== language.get()) {
                event.emit(EVENT.LANG_CHANGE, lang);
            }
            if (typeof FileReader == 'undefined') {
                toast('你的浏览器暂不支持该功能');
                return;
            }
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                event.emit(EVENT.SET_CODE, this.result);
            };
        };
    }
    fileInput.click();
}