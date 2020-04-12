import {THEME, LANG, DEFAULT_FONT_SIZE} from '../components/js/editor';
import {read, write, TYPE} from '../../notebook';
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
            if (emit && emitThis)
                event.emit(emit, this._value);
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

export const theme = generateStatus({
    def: THEME.LIGHT,
    name: TYPE.THEME,
    emit: EVENT.THEME_CHANGE
});

export const dragPercent = generateStatus({
    def: 50,
    name: TYPE.DRAG_PERCENT,
    emit: EVENT.DRAG_PERCENT
});

export const dragStatus = generateStatus({
    def: false,
    name: TYPE.DRAG_STATUS,
    emit: EVENT.DRAG_STATUS
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