/*
 * @Author: tackchen
 * @Date: 2021-04-29 17:01:39
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 23:04:10
 * @FilePath: \jsbox\src\main\components\files\module\file-searcher.js
 * @Description: 搜索文件
 */

import {toast} from '../../../js/util';
import {files} from '../file-system';

function getFileByAbsolutePathArr (pathArray) {
    if (pathArray[0] === '@') {
        console.log('加载系统文件', pathArray);
    } else {
        return traverseFiles(files, pathArray);
    }
}

function traverseFiles (children, pathArray) {
    const result = children.find(item => item.name === pathArray[0]);
    if (result) {
        pathArray.shift();
        if (pathArray.length === 0) {
            return result;
        }
        return traverseFiles(result.children, pathArray);
    } else {
        return null;
    }
}

export function searchFileByAbsolutePath (targetFileAbsolutePath) {
    const pathArray = handleAbsolutePath(targetFileAbsolutePath);
    return getFileByAbsolutePathArr(pathArray);
}
window.searchFileByAbsolutePath = searchFileByAbsolutePath;

export function searchFileByRelativePath (currentFileAbsolutePath, targetFileRelativePath) {
    const pathArray = handleRelativePath(currentFileAbsolutePath, targetFileRelativePath);
    return getFileByAbsolutePathArr(pathArray);
}
window.searchFileByRelativePath = searchFileByRelativePath;

function handleAbsolutePath (absolutePath) {
    if (absolutePath[0] === '@') {
        if (absolutePath[1] !== '/') {
            absolutePath = absolutePath.replace('@', '@/');
        }
        return absolutePath.split('/');
    }
    if (absolutePath[0] !== '/') {
        toast.error(`错误的文件路径: ${absolutePath}`);
        return null;
    }
    return absolutePath.substr(1).split('/');
}

// ['@', 'aa'] 首字母为@表示官方库
export function handleRelativePath (currentFileAbsolutePath, targetFileRelativePath) {
    if (targetFileRelativePath[0] === '/') {
        // 绝对路径直接返回
        return handleAbsolutePath(targetFileRelativePath);
    }
    const aPathArr = handleAbsolutePath(currentFileAbsolutePath);
    if (!aPathArr) return null;
    aPathArr.pop(); // 移除最后一位文件

    const rPathArr = targetFileRelativePath.split('/');
    const first = rPathArr[0];
    if (first !== '..' && first !== '.' && first !== '@') {
        toast.error(`相对文件路径超过根目录: ${targetFileRelativePath}`);
        return null;
    }
    if (first === '@') {
        return rPathArr;
    }
    let offset = 0;
    for (let i = 0; i < rPathArr.length; i++) {
        const item = rPathArr[i];
        if (item === '..') { // 向上一级
            if (aPathArr.length === 0) {
                toast.error(`相对文件路径超过根目录: ${targetFileRelativePath}`);
                return null;
            }
            aPathArr.pop();
            offset ++;
        } else if (item === '.') { // 当前文件
            offset ++;
            break;
        } else {
            break;
        }
    }
    if (offset > 0) {
        rPathArr.splice(0, offset);
    }

    const finalAbsolutePath = '/' + aPathArr.concat(rPathArr).join('/');
    return handleAbsolutePath(finalAbsolutePath);
}

export function pathArrayToAbsolutePath (pathArray) {
    const path = pathArray.join('/');
    if (path[0] === '@') {
        return path;
    }
    return `/${path}`;
}