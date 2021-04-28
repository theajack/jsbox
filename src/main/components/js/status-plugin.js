import event from '../../js/event';
import {EVENT, LANG} from '../../js/constant';
import {toast} from '../../js/util';
import {Libs} from './lib';
import {code as Code, language} from '../../js/status';
import {getCurrentFile} from '../files/file-system';

export const fileStatus = (() => {
    let blob = null;
    let initial = true;
    let modifiedWithSize = false;
    const data = {
        size: '--',
        modified: false,
    };
    const method = {
        saveCode () {
            event.emit(EVENT.SAVE_SINGLE_CODE);
        }
    };
    function fixSize (size) {
        if (size < 1000) {
            return size + ' byte';
        }
        return parseFloat((size / 1024).toFixed(2)) + ' kb';
    }
    function setSize (file) {
        modifiedWithSize = false;
        const code = file.unsavedContent || file.content;
        blob = new Blob([code], {type: 'application/text'});
        data.size = fixSize(blob.size);
    }
    setInterval(() => {
        if (modifiedWithSize) {
            setSize(getCurrentFile());
        }
    }, 2000);
    event.regist(EVENT.CODE_CHANGE, (code) => {
        modifiedWithSize = true;
        if (initial) {
            initial = false;
            data.modified = !(code === Code.get(true));
        } else {
            if (!data.modified) {
                data.modified = true;
            }
        }
        console.log(code);
    });
    event.regist(EVENT.ON_FILE_OPEN, (file) => {
        setSize(file);
        data.modified = file.unsave;
    });
    event.regist(EVENT.SAVE_CODE, () => {
        data.modified = false;
    });
    event.regist(EVENT.SAVE_SINGLE_CODE, () => {
        data.modified = false;
    });
    // 旧的逻辑
    // if (getUrlParam('remind') !== 'false') {
    //     debugger;
    //     window.addEventListener('beforeunload', function (e) {
    //         if (fileStatus.data.modified) {
    //             var confirmationMessage = '当前文件未保存，是否确认离开？';
    //             (e || window.event).returnValue = confirmationMessage;
    //             return confirmationMessage;
    //         }
    //     });
    // }

    return {data, method};
})();


export const envStstus = (() => {
    const data = {
        lib: '',
        env: '',
        lang: '',
    };
    const method = {
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