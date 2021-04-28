/*
 * @Author: tackchen
 * @Date: 2021-04-28 09:58:47
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-28 11:40:07
 * @FilePath: \jsbox\src\main\components\js\editor-pool.js
 * @Description: Coding something
 */

const pool = {};

export function addIntoEditorPool (id, editor) {
    pool[id] = editor;
}

export function getEditorByFileId (id) {
    return pool[id];
}

export function formatEditorByFileId (id, success) {
    const editor = getEditorByFileId(id);
    if (editor) {
        editor.format(success);
    }
}

window.editorPool = pool;