import {THEME, LANG, DEFAULT_FONT_SIZE} from '../components/js/editor';
import {read, write, TYPE} from './notebook';
import event from './event';
import {EVENT} from './constant';


function generateStatus ({
    def,
    name,
    emit
}) {
    return {
        _value: null,
        get (storage) {
            if (storage === true) {
                return read(name);
            }
            if (this._value === null) {
                let v = read(name);
                this._value = v === null ? def : v;
            }
            return this._value;
        },
        set (value, save = true, emitThis = true) {
            this.stash(value, false);
            if (save) {
                this.save();
            }
            this.emit(emitThis);
        },
        emit (emitThis = true) {
            if (emit && emitThis) {
                if (typeof emit === 'string') {
                    event.emit(emit, this._value);
                } else if (typeof emit === 'function') {
                    emit(this._value);
                }
            }
        },
        stash (value, emitThis = true) {
            this._value = value;
            this.emit(emitThis);
        },
        save () {
            write(name, this._value);
        },
        init (value, save = false) {
            if (typeof value === 'undefined' || value === null) {
                value = this.get();
            }
            this.set(value, save);
        }
    };
}

export let status = {};

export function buildStatus (name, options) {
    if (!status[name]) {
        options.name = name;
        status[name] = generateStatus(options);
    }
    return status[name];
}


export const theme = generateStatus({
    def: THEME.LIGHT,
    name: TYPE.THEME,
    emit: EVENT.THEME_CHANGE
});


export const code = generateStatus({
    def: '',
    name: TYPE.CODE,
    emit: EVENT.SET_CODE
});

export const language = generateStatus({
    def: LANG.JAVASCRIPT,
    name: TYPE.LANGUAGE,
    emit: EVENT.LANG_CHANGE
});
export const htmlLog = generateStatus({
    def: true,
    name: TYPE.HTML_PANEL,
    emit: EVENT.HTML_PANEL_CHANGE
});
export const fontSize = generateStatus({
    def: DEFAULT_FONT_SIZE,
    name: TYPE.FONT_SIZE,
    emit: EVENT.FONT_SIZE_CHANGE
});

export const dragPercentOption = {
    def: 50,
    name: TYPE.DRAG_PERCENT,
    emit: EVENT.DRAG_PERCENT
};

export const dragPercent = generateStatus(dragPercentOption);

export const dragStatusOption = {
    def: false,
    name: TYPE.DRAG_STATUS,
    emit: EVENT.DRAG_STATUS
};

export const dragStatus = generateStatus(dragStatusOption);

export const codeDragPercent = generateStatus({
    def: 50,
    name: TYPE.CODE_DRAG_PERCENT,
    emit: EVENT.CODE_DRAG_PERCENT
});

export const codeDragStatus = generateStatus({
    def: false,
    name: TYPE.CODE_DRAG_STATUS,
    emit: EVENT.CODE_DRAG_STATUS
});

export function getDragStatus (name) {
    if (name === 'log') {
        return {
            percent: dragPercent,
            status: dragStatus,
            percentEvent: EVENT.DRAG_PERCENT,
            statusEvent: EVENT.DRAG_STATUS
        };
    }
    if (name === 'code') {
        return {
            percent: codeDragPercent,
            status: codeDragStatus,
            percentEvent: EVENT.CODE_DRAG_PERCENT,
            statusEvent: EVENT.CODE_DRAG_STATUS
        };
    }
}