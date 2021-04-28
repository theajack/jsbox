/*
 * @Author: tackchen
 * @Date: 2021-04-28 18:01:16
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-28 18:05:24
 * @FilePath: \jsbox\src\main\components\js\file-selected.js
 * @Description: Coding something
 */

const selectedIds = [];

export function getSelectedIds () {
    return selectedIds;
}

export function selectFile (id) {
    if (typeof id === 'object') {id = id.id;}
    if (!selectedIds.includes(id)) {
        selectedIds.push(id);
    }
}

export function clearSelectedFiles () {
    if (selectedIds.length > 0) {
        selectedIds.splice(0, selectedIds.length);
    }
}

export function unselectedFile (id) {
    if (typeof id === 'object') {id = id.id;}
    const index = selectedIds.indexOf(id);
    if (index !== -1) {
        selectedIds.splice(index, 1);
    }
}