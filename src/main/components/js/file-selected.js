/*
 * @Author: tackchen
 * @Date: 2021-04-28 18:01:16
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-28 23:52:57
 * @FilePath: \jsbox\src\main\components\js\file-selected.js
 * @Description: Coding something
 */

import {FILE_NONE, FILE_TYPE} from '../../js/constant';
import {isUndf} from '../../js/util';
import {globalFileAttr} from '../files/file';
import {files} from '../files/file-system';

const selectedIds = [];
window.selectedIds = selectedIds;

let isCtrlKeyDown = false;
let isShiftKeyDown = false;
let shiftStartId = -1;

export function isSelectShiftOrCtrlDown () {
    return isCtrlKeyDown || isShiftKeyDown;
}

export function initSelectKeyEvent () {
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey) {
            isShiftKeyDown = true;
        } else if (e.ctrlKey) {
            isCtrlKeyDown = true;
        }
    }, false);
    window.addEventListener('keyup', () => {
        if (isShiftKeyDown) {
            shiftStartId = -1;
            isShiftKeyDown = false;
        }
        isCtrlKeyDown = false;
    }, false);
    // 点击其他地方取消选中
    window.addEventListener('click', (e) => {
        if (e.target.className.indexOf('file-name-comp') === -1) {
            clearSelectedFiles();
        }
    }, false);
}

export function getSelectedIds () {
    return selectedIds;
}

export function selectFile (id) {
    if (typeof id === 'object') {id = id.id;}
    if (!isCtrlKeyDown && !isShiftKeyDown) {
        clearSelectedFiles();
    }
    if (isShiftKeyDown) {
        IndexFiles.init();
        const defStartId = (selectedIds.length === 0) ? globalFileAttr.contentId : selectedIds[0];
        if (shiftStartId === -1) {
            shiftStartId = defStartId;
        }
        // 没有选中的
        if (isUndf(shiftStartId) || shiftStartId === FILE_NONE) {
            return true;
        } else {
            shiftSelectFile(shiftStartId, id);
        }
    } else {
        if (!selectedIds.includes(id)) {
            selectedIds.push(id);
            return true;
        } else {
            if (isCtrlKeyDown) {
                unselectFile(id);
                shiftStartId = id;
            }
        }
    }
    // console.log(selectedIds);
    return false;
}

const IndexFiles = (() => {

    let indexFiles = [];
    let idIndexes = {};
    
    const traveseChildren = (files) => {
        files.forEach(file => {
            idIndexes[file.id] = indexFiles.length;
            indexFiles.push(file);
            if (file.type === FILE_TYPE.DIR) {
                traveseChildren(file.children);
            }
        });
    };
    return {
        init () {
            if (indexFiles.length === 0) {
                traveseChildren(files);
            }
            // console.log(idIndexes);
            return indexFiles;
        },
        getIndexByFileId (id) {
            return idIndexes[id];
        },
        clear () {
            indexFiles = [];
            idIndexes = {};
        },
        traverseRange (start, end, fn) {
            const min = Math.min(start, end);
            const max = Math.max(start, end);
            for (let i = min; i <= max; i++) {
                fn(indexFiles[i]);
            }
        }
    };
})();

function shiftSelectFile (startId, endId) {
    clearSelectedFiles(true);
    const startIndex = IndexFiles.getIndexByFileId(startId);
    const endIndex = IndexFiles.getIndexByFileId(endId);
    // console.log(startIndex, endIndex);
    IndexFiles.traverseRange(startIndex, endIndex, (file) => {
        // console.warn('traverseRange', file.id);
        selectedIds.push(file.id);
    });
}

export function clearSelectedFiles (ignoreClearIndex = false) {
    if (selectedIds.length > 0) {
        selectedIds.splice(0, selectedIds.length);
    }
    if (!ignoreClearIndex) {
        IndexFiles.clear();
    }
}

export function unselectFile (id) {
    if (typeof id === 'object') {id = id.id;}
    const index = selectedIds.indexOf(id);
    if (index !== -1) {
        selectedIds.splice(index, 1);
    }
}