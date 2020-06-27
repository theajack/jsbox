
/**
 * Event BUS
 */
import {isUndf, isObject} from './util';

let events = {};
let EVENT = {};

export function checkEvent (name) {
    if (events[name]) {
        return true;
    } else {
        return false;
    }
}

function init (name) {
    if (isUndf(EVENT[name])) {
        events[name] = new _event(name);
        EVENT[name] = name;
    }
}

function regist (name, listener) {
    if (isObject(name)) {
        for (let key in name) {
            regist(key, name[key]);
        }
        return;
    }
    if (!checkEvent(name)) {
        init(name);
    }
    events[name].regist(listener);
}

function remove (name, listener) {
    if (!checkEvent(name)) {
        console.warn('removeEvent:未找到事件 ' + name);
        return false;
    }
    if (isUndf(listener)) {// 移除所有监听
        console.error('请传入要移除的listener');
        return false;
    } else {// 移除单个监听
        let index = events[name].listeners.indexOf(listener);
        if (index === -1) {
            console.warn('removeEvent:未找到监听函数 ' + name);
            return false;
        } else {
            events[name].listeners.splice(index, 1);
            return true;
        }
    }
}

function emit (name, data) {
    if (checkEvent(name)) {
        events[name].emit(data);
    } else {
        // console.warn('错误的事件：' + name);
    }
}

class _event {
    constructor (name) {
        this.name = name;
        this.listeners = [];
    }
    regist (listener) {
        this.listeners.push(listener);
    }
    emit (data) {
        this.listeners.forEach(listener => {
            listener(data);
        });
    }
}

let event = {
    EVENT, // 事件枚举
    // init, // 初始化一个事件（注册一个发布者） // 初始化与注册和到一起
    emit, // 触发事件
    regist, // 注册一个监听者
    checkEvent, // 检查是否存在事件
    remove
};

export let evt = event;

export default event;