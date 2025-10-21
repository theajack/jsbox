/*
 * @Author: chenzhongsheng
 * @Date: 2023-08-15 07:43:05
 * @Description: Coding something
 */
// import { debounce } from 'src/utils';
import {Editor} from './monaco';
const _editor = new Editor({
    // @ts-ignore
    dom: document.getElementById('app'),
    code: 'console.log(\'Hello\')',
    onchange: (v) => {
        console.log('code', v);
    },
});
function setCode (code) {
    _editor.editor.setScrollTop(0);
    _editor.code(code);
};

window.setCode = setCode;