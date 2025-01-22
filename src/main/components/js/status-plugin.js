import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {LANG} from './editor';
import {toast, getUrlParam} from '../../js/util';
import {Libs} from './lib';
import {code as Code, language} from '../../js/status';

export let fileStatus = (() => {
    let blob = null;
    let initial = true;
    let modifiedWithSize = false;
    let data = {
        size: '--',
        modified: false,
    };
    let method = {
        saveCode () {
            event.emit(EVENT.SAVE_CODE);
        }
    };
    function fixSize (size) {
        if (size < 1000) {
            return size + ' byte';
        }
        return parseFloat((size / 1024).toFixed(2)) + ' kb';
    }
    function setSize () {
        modifiedWithSize = false;
        event.emit(EVENT.USE_CODE, (code) => {
            blob = new Blob([code], {type: 'application/text'});
            data.size = fixSize(blob.size);
        });
    }
    setInterval(() => {
        if (modifiedWithSize) {
            setSize();
        }
    }, 2000);
    event.regist(EVENT.CODE_CHANGE, () => {
        modifiedWithSize = true;
        if (initial) {
            initial = false;
            event.emit(EVENT.USE_CODE, (code) => {
                data.modified = !(code === Code.get(true));
            });
        } else {
            if (!data.modified) {
                data.modified = true;
            }
        }
    });
    event.regist(EVENT.SAVE_CODE, () => {
        data.modified = false;
    });
    if (getUrlParam('remind') !== 'false') {
        window.addEventListener('beforeunload', function (e) {
            if (location.host.startsWith('localhost:')) return;
            if (fileStatus.data.modified) {
                var confirmationMessage = '\o/';
                (e || window.event).returnValue = confirmationMessage;
                return confirmationMessage;
            }
        });
    }

    setTimeout(() => {
        setSize();
    }, 100);
    return {data, method};
})();


export let envStstus = (() => {
    let data = {
        lib: '',
        env: '',
        lang: '',
    };
    let method = {
        showLib () {
            toast('当前加载的第三方库:' + Libs.join(' , '), false);
        },
        selectLang () {
            event.emit(EVENT.OPEN_LANG_CHOOSE);
        },
        selectEnv () {
            event.emit(EVENT.OPEN_ENV_CHOOSE);
        }
    };
    event.regist({
        [EVENT.LANG_CHANGE]: (lang) => {
            switch (lang) {
                case LANG.HTML:lang = 'html'; break;
                case LANG.JAVASCRIPT:lang = 'javascript'; break;
                case LANG['C#']:lang = 'c#'; break;
                case LANG['C++']:lang = 'c++'; break;
            }
            language.stash(lang, false);
            data.lang = lang;
        },
        [EVENT.ADD_LIB]: (name) => {
            if (name.length > 20) {
                name = `${name.substring(0, 10)}…${name.substring(name.length - 10)} `;
            }
            if (Libs.length > 1) {
                name += '…';
            }
            data.lib = name;
        },
        [EVENT.SET_ENV]: (env) => {
            data.env = env;
        }
    });
    return {data, method};
})();